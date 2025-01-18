import capitalize from './capitalize';
import stopTyping from './stop-typing';

const directives = {
    capitalize, stopTyping
};

export default {
    install(app) {
        Object.entries(directives).forEach(([name, directive]) => {
            app.directive(name, directive);
        });
    }
};