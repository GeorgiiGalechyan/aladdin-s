| **API/roles**     | **admin**      | **employee**   | **customer**   | **guest** |
| ----------------- | -------------- | -------------- | -------------- | --------- |
| _auth_            | _auth_         | _auth_         | _auth_         | _auth_    |
| api/auth/register | false          | false          | false          | true      |
| api/auth/signin   | only sudo mode | only sudo mode | only sudo mode | true      |
| api/auth/signout  | true           | true           | true           | false     |
