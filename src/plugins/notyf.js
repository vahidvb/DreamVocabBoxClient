/// Git : https://github.com/caroso1222/notyf

import { Notyf } from 'notyf';

export default {
    install(app) {
        const notyf = new Notyf({
            position: { x: 'center', y: 'top' },
            types: [
                {
                    type: 'warning',
                    background: 'orange',
                    icon: {
                        className: '',
                        tagName: 'i',
                        text: 'warning'
                    },
                    dismissible: true
                },
                {
                    type: 'info',
                    background: 'blue',
                    icon: false,
                    dismissible: true
                }
            ]
        });

        app.config.globalProperties.notyf = {
            success(message, duration = 3000) {
                notyf.open({
                    type: 'success',
                    message,
                    duration,
                    dismissible: true
                });
            },
            warning(message, duration = 3000) {
                notyf.open({
                    type: 'warning',
                    message,
                    duration,
                    dismissible: true
                });
            },
            error(message, duration = 3000) {
                notyf.open({
                    type: 'error',
                    message,
                    duration,
                    dismissible: true
                });
            },
            open(options) {
                notyf.open(options);
            },
            apiResult(result, duration = 3000) {
                notyf.open({
                    type: result.IsSuccess ? 'success' : 'error',
                    message: result.Message,
                    duration: duration,
                    dismissible: true
                });
            },
        };
    },
};
