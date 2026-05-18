import { ConsoleLogger } from '@nestjs/common';

const FILTERED_CONTEXTS = [
  'InstanceLoader',
  'RoutesResolver',
  'RouterExplorer',
  'NestFactory',
];

export class AppLogger extends ConsoleLogger {
  log(message: string, context?: string) {
    if (context && FILTERED_CONTEXTS.includes(context)) return;
    super.log(message, context);
  }
}
