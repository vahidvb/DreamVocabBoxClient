import { nextTick } from 'vue';

export default {
    beforeMount(el) {
        const input = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea');

        if (input) {
            input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            input.dispatchEvent(new Event('input'));

            let isUpdating = false;
            input.addEventListener('input', () => {
                if (isUpdating) return;
                isUpdating = true;

                const start = input.selectionStart;
                const end = input.selectionEnd;

                input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
                input.setSelectionRange(start, end);

                input.dispatchEvent(new Event('input'));

                isUpdating = false;
            });
        }
    },
    updated(el) {
        nextTick(() => {
          const input = el.tagName === 'INPUT' ? el : el.querySelector('input');
          if (input) {
            input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
          }
        });
      }
};
