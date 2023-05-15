<template>
    <b-row align-h="center">
        <div class="col-8">
            <b-table :class="isDark ?'bg-dark text-light' : ''" :items="items" :fields="fields"/>
        </div>
    </b-row>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: 'CasesHistoryView',
    data() {
        return {
            items: [
                {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
                {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
                {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
                {age: 38, first_name: 'Jami', last_name: 'Carney'}
            ],
            fields: [
                {
                    key: 'last_name',
                    sortable: true
                },
                {
                    key: 'first_name',
                    sortable: true
                },
                {
                    key: 'age',
                    label: 'Person age',
                    sortable: true
                }
            ],
        }
    },
    computed: {
        ...mapState(["isDark"])
    },
}
</script>