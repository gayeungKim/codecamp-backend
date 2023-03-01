# FROM : docker hub로 부터 download
#FROM ubuntu:20.04

# RUN : 명령어 실행
#RUN apt install nodejs

# node가 깔린 리눅스
FROM node:14

# -> 리눅스 기반 컴퓨터 설치 + nodejs 설치

# RUN mkdir myfolder

# ./ : 현위치, 내 폴더의 index.js를 도커안의 폴더 myfolder로 카피
# 폴더가 없을 시 생성 됨
COPY ./index.js myfolder/

# 커서를 myfolder에 위치
#RUN cd ./myfolder

# 커서 위치 변경
WORKDIR /myfolder/

RUN node index.js
# = CMD node index.js
# RUN 여러번 / CMD 마지막 한번
