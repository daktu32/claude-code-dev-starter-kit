import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { ProjectConfig } from './types.js';

export class FileManager {
  private readonly rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    // scriptsディレクトリから実行された場合は親ディレクトリをルートとする
    if (path.basename(rootDir) === 'scripts') {
      this.rootDir = path.dirname(rootDir);
    } else {
      this.rootDir = rootDir;
    }
  }

  async createBackup(filePath: string): Promise<string> {
    const fullPath = path.resolve(this.rootDir, filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${fullPath}.backup.${timestamp}`;

    if (await fs.pathExists(fullPath)) {
      await fs.copy(fullPath, backupPath);
      return backupPath;
    }

    return '';
  }

  async createBackupDirectory(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(this.rootDir, '.backups', `setup-${timestamp}`);
    await fs.ensureDir(backupDir);
    return backupDir;
  }

  async backupAllTemplates(): Promise<string> {
    const backupDir = await this.createBackupDirectory();

    const templatePatterns = [
      'CLAUDE.md',
      'README.md',
      'PROMPT.md',
      'docs/**/*.md',
      'prompts/**/*.md',
      '.claude/**/*',
      'infrastructure/**/*',
    ];

    for (const pattern of templatePatterns) {
      const files = await glob(pattern, {
        cwd: this.rootDir,
        ignore: ['node_modules/**', 'scripts/**', '.backups/**'],
      });

      for (const file of files) {
        const sourcePath = path.join(this.rootDir, file);
        const targetPath = path.join(backupDir, file);

        if (await fs.pathExists(sourcePath)) {
          await fs.ensureDir(path.dirname(targetPath));
          await fs.copy(sourcePath, targetPath);
        }
      }
    }

    return backupDir;
  }

  async validateProjectStructure(): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];

    const requiredFiles = [
      'CLAUDE.md',
      'README.md',
      'CUSTOMIZATION_GUIDE.md',
      'docs/tech-stack.md',
      'prompts/basic-development.md',
      'prompts/enterprise-development.md',
      'prompts/opensource-development.md',
      'prompts/startup-development.md',
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.rootDir, file);
      if (!(await fs.pathExists(filePath))) {
        issues.push(`必須ファイルが見つかりません: ${file}`);
      }
    }

    const requiredDirs = ['docs', 'prompts', 'infrastructure', '.github/workflows'];

    for (const dir of requiredDirs) {
      const dirPath = path.join(this.rootDir, dir);
      if (!(await fs.pathExists(dirPath))) {
        issues.push(`必須ディレクトリが見つかりません: ${dir}`);
      }
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  async removeUnusedInfrastructure(techStack: { infrastructure: string }): Promise<string[]> {
    const removedFiles: string[] = [];
    const infraDir = path.join(this.rootDir, 'infrastructure', 'lib', 'stacks');

    if (!(await fs.pathExists(infraDir))) {
      return removedFiles;
    }

    const stackFiles = await fs.readdir(infraDir);
    const isAWS = techStack.infrastructure.toLowerCase().includes('aws');

    // 技術スタックに応じて未使用のスタックファイルを削除
    for (const file of stackFiles) {
      const filePath = path.join(infraDir, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile() && file.endsWith('.ts')) {
        let shouldRemove = false;

        // AWS未使用の場合はAWS用スタックを削除
        if (!isAWS && file.includes('aws')) {
          shouldRemove = true;
        }

        // 認証スタックが不要な場合は削除（将来的にユーザー入力で拡張可能）
        // 現状は認証スタックは残す
        if (file.includes('auth-stack.ts')) {
          // For now, keep auth stack - could be made configurable
        }

        if (shouldRemove) {
          await fs.remove(filePath);
          removedFiles.push(file);
        }
      }
    }

    return removedFiles;
  }

  async updateGitignore(additionalPatterns: string[] = []): Promise<void> {
    const gitignorePath = path.join(this.rootDir, '.gitignore');

    if (!(await fs.pathExists(gitignorePath))) {
      return;
    }

    const content = await fs.readFile(gitignorePath, 'utf-8');
    const lines = content.split('\n');

    // バックアップディレクトリを.gitignoreに追加（未追加の場合）
    const backupPattern = '.backups/';
    if (!lines.includes(backupPattern)) {
      lines.push('', '# Setup assistant backups', backupPattern);
    }

    // 追加パターンも追加
    for (const pattern of additionalPatterns) {
      if (!lines.includes(pattern)) {
        lines.push(pattern);
      }
    }

    await fs.writeFile(gitignorePath, lines.join('\n'));
  }

  async createProjectConfigFile(config: ProjectConfig): Promise<void> {
    const configDir = path.join(this.rootDir, '.claude');
    const configPath = path.join(configDir, 'project-config.json');

    await fs.ensureDir(configDir);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  }

  async getFilesToProcess(): Promise<string[]> {
    const patterns = ['CLAUDE.md', 'README.md', 'docs/**/*.md', '.claude/**/*.template'];

    const files: string[] = [];

    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        cwd: this.rootDir,
        ignore: ['node_modules/**', 'scripts/**', '.backups/**'],
      });
      files.push(...matches);
    }

    return files;
  }

  async restoreFromBackup(backupDir: string): Promise<void> {
    if (!(await fs.pathExists(backupDir))) {
      throw new Error(`バックアップディレクトリが見つかりません: ${backupDir}`);
    }

    const files = await glob('**/*', {
      cwd: backupDir,
      nodir: true,
    });

    for (const file of files) {
      const sourcePath = path.join(backupDir, file);
      const targetPath = path.join(this.rootDir, file);

      await fs.ensureDir(path.dirname(targetPath));
      await fs.copy(sourcePath, targetPath);
    }
  }
}
