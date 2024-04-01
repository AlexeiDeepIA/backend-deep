## Requirements 

- Node v18
- Git
- Contentful CLI

## Common setup

Clone the repo and install the dependencies 

```bash
git clone https://github.com/Deepia-Development/deeptarget-backend.git
cd deeptarget-backend
```

Then switch to branch 'dev-campaigns'. This branch is still in development.

```bash
git checkout -b dev-campaigns
git pull origin dev-campaigns
```

Install all the dependencies 

```
npm install
```

## You need to add file `.env` on the main directory

```
MONGO_URI=''
HOSTNAME=''
PORT=''
TOKEN=''
EXPIRATION=''
```

## Now use the command `npm run test`

```
npm run test
```






