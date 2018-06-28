import Vue from 'vue';
//防止鼠标多次点击
const directive = Vue.directive('delayClick',{
    inserted(el, binding) {
        let delayTime = binding.value || 3000; 
        el.clickHandler = () => {
            setTimeout(() => {
                el.disabled = true;
                el.classList.add("disabled-btn");
                setTimeout(() => {
                    el.disabled = false;
                    el.classList.remove("disabled-btn");
                }, delayTime);
            }, 0)
        };
        el.addEventListener('click', el.clickHandler);
    }
    
})

export {directive};