import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implements/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorgeProvider',
  DiskStorageProvider,
);
