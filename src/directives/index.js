import capitalize from './capitalize';

const directives = {
    capitalize,
};

export default {
    install(app) {
        Object.entries(directives).forEach(([name, directive]) => {
            app.directive(name, directive);
        });
    }
};