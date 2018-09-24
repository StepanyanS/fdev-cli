import { App } from './app/app';

const app = new App(process.env.NODE_ENV);
switch(process.env.NODE_ENV) {
    case 'development':
        app.bootstrap();
        break;
    case 'production':
        app.build();
        break;
}