import { Row } from 'src/components';
import { Account, User, Image } from 'types';

interface UserCreatorArgs {
  users: User[];
  accounts: Account[];
  images: Image[];
}

export const usersDataConverter = ({
  users,
  accounts,
  images,
}: UserCreatorArgs): Row[] => {
  return users.map(user => {
    const { payments, posts } = accounts.find(
      account => account.userID === user.userID
    );
    const { url } = images.find(
      userImageData => userImageData.userID === user.userID
    );
    return {
      ...user,
      avatar: url,
      lastPayments: payments[0]?.totalSum || 0,
      posts,
    };
  });
};
