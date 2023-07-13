<template>
    <b-modal ref="office-modal" centered hide-footer
             title="Message from the clerk">
        <p style="text-align: center"><span><i class="ti ti-user"/></span> Hey judge, where do you wanna go ?</p>
        <div v-for="page in officePages" :key="page.index" class="mb-3">
            <b-button block variant="info" @click="goToRoutes(page.link)">
                <i :class="page.icon"/>
                {{ page.text }}
            </b-button>
        </div>
    </b-modal>
</template>
<script>
import {eventBus} from "@/main";

export default {
    name: "OfficeModal",
    data() {
        return {
            officePages: [
                /*{text: "Go to court", link: "/", icon: "ti ti-gavel"},*/
                {text: "Visit archives", link: "/history", icon: "ti ti-archive"},
                {text: "See statistics", link: "/statistics", icon: "ti ti-chart-histogram"},
                {text: "Reports", link: "/reports", icon: "ti ti-clipboard-text"},
            ]
        }
    },
    mounted() {
        eventBus.$on('openOfficeModal', () => {
            this.$refs["office-modal"].show();
        });
        eventBus.$on('closeOfficeModal', () => {
            this.$refs["office-modal"].hide();
        });
    },
    methods: {
        goToRoutes(route){
            this.$router.push(route);
            eventBus.$emit('closeOfficeModal');
        }
    }
}
</script>