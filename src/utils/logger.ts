import util from 'util';
import chalk from 'chalk';

const log = util.debuglog('server');

export default {
  info(message: string): void {
    log(chalk.cyanBright(message));
  },
  warn(message: string): void {
    log(chalk.yellowBright(message));
  },
  error(message: string): void {
    log(chalk.redBright(message));
  },
};
