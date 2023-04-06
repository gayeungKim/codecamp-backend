# 기존 build 를 했었으면 cashing

FROM node:14

WORKDIR /myfolder/
COPY ./package.json /myfolder
COPY ./yarn.lock /myfolder

RUN yarn install
# module 설치
# index.js 등 파일 수정에도 재설치가 됨

COPY . /myfolder/

CMD yarn start:dev
# RUN yarn dev
# 실행이 계속 진행됨으로 build 가 안됨