import { debounce } from "lodash";

export default {
    beforeMount(el, binding) {
        const delay = binding.arg || 500;
        const callback = binding.value;

        if (typeof callback !== "function") return;

        const debouncedCallback = debounce(callback, delay);
        const input = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea');

        if (input) {
            input.addEventListener('input', debouncedCallback);
            input.addEventListener('change', debouncedCallback);
            el._debouncedCallback = debouncedCallback;
        }
    },
    unmounted(el) {
        const input = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea');

        if (input && el._debouncedCallback) {
            input.removeEventListener('input', el._debouncedCallback);
            input.removeEventListener('change', el._debouncedCallback);
            delete el._debouncedCallback;
        }
    },
};
