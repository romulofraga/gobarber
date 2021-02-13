import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implements/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvder';

container.registerSingleton<IStorageProvider>(
  'StorgeProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
