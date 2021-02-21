import { ObjectID } from 'mongodb';

import INotificationsrepository from '@modules/notifications/repositories/INotificationsrepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsrepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const newNotification = new Notification();

    Object.assign(newNotification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(newNotification);

    return newNotification;
  }
}

export default NotificationsRepository;
