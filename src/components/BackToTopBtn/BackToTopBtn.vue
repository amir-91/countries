<template>
    <button
        ref="backToTop"
        v-if="showBtn"
        type="button"
        class="btn"
        id="btn-back-to-top"
        @click="backToTop"
        >
        <ion-icon name="chevron-up-outline"></ion-icon>
</button>
</template>

<script>
export default {
    data () {
        return {
            showBtn: false
        }
    },
    methods: {
        scrollFunction() {
            if (
                document.body.scrollTop > 200 ||
                document.documentElement.scrollTop > 200
            ) {
                this.showBtn = true
            } else {
                this.showBtn = false
            }
        },
        backToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },
    mounted(){
        window.onscroll = () => this.scrollFunction();
    }
}
</script>