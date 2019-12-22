const core = require('@actions/core');
const exec = require('@actions/exec').exec;
const github = require('@actions/github');
const cp = require('@actions/io').cp;

(async () => {
  try {
    const token = core.getInput('ACCESS_TOKEN');
    if (!token) {
      throw new Error('No access token found!');
    }
    const url = `https:/${token}@github.com/${github.context.repo.owner}/${github.context.repo.repo}.git`;
    const directory = './__sapper__/export';

    await exec('npm install');
    await exec('npm run export');
    await cp('./CNAME', `${directory}/CNAME`, { force: true });

    await exec('git init', [], { cwd: directory });
    await exec('git config user.name', [github.context.actor], {
      cwd: directory
    });
    await exec(
      'git config user.email',
      [`${github.context.actor}@users.noreply.github.com`],
      { cwd: directory }
    );
    await exec('git add', ['.'], { cwd: directory });
    await exec(
      'git commit',
      ['-m', `Deploy via Sapper Publish Action for ${github.context.sha}`],
      { cwd: directory }
    );
    await exec('git push', ['-f', url, 'master:master'], {
      cwd: directory
    });
  } catch (error) {
    console.error('Could not complete deployment!');
    core.setFailed(error.message);
  } finally {
    console.log('Successfully completed deployment!');
  }
})();
