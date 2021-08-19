FROM node:latest

COPY ./package*.json /src/

WORKDIR /src

ARG mode="prod"

RUN if [ "${mode}" = "dev" ] ; then npm install && echo "install aka an mit liegts nicht" ; else npm install --production ; fi
RUN echo "${mode}"

EXPOSE 3000

COPY . /src

CMD if [ "$mode" = "dev" ] ; then npm run debug ; else npm run start ; fi