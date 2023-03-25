# 컴퓨터 제조 설명서

# FROM : docker hub로 부터 download
# 우분투 컴퓨터 실행 됨
# FROM ubuntu:20.04

# nodejs 설치
# RUN : 명령어 실행
# RUN apt install nodejs

# -- node가 깔린 리눅스 위 두 실행문을 아래 실행문으로 대체 가능
# node가 설치된 우분투 컴퓨터 실행:버전
FROM node:14

# # -> 리눅스 기반 컴퓨터 설치 + nodejs 설치

# index.js 를 담을 폴더 생성
# 폴더가 없으면 만들어서 카피하기 때문에 생략 가능
# RUN mkdir myfolder

# ./ : 현위치, 내 폴더의 index.js를 도커안의 폴더 myfolder로 카피
# 폴더가 없을 시 생성 됨
# 복사 / 현위치의 파일을 / 해당 폴더로
COPY ./index.js myfolder/

# 커서를 myfolder에 위치, 해당 폴더로 위치
# RUN cd ./myfolder

# 커서 위치 변경, 위 명령 대체
WORKDIR /myfolder/

# index.js 파일 실행
CMD node index.js
# RUN 여러번 / CMD 마지막 한번
# RUN node index.js


# docker images
# docker run imgid