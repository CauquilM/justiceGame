<template>
    <div class="cases-history-container">
        <b-row align-h="center" style="margin-top: 10%">
            <h3 class="mb-4">Type your Idea</h3>
            <div class="col-lg-4 col-md-6 col-sm-5 col-8">
                <b-form-textarea
                        id="textarea-no-resize"
                        v-model="textIdea"
                        no-resize
                        placeholder="My idea is..."
                        rows="6"
                ></b-form-textarea>
            </div>
        </b-row>
        <b-row align-h="center" align-v="center" class="mt-4">
            <div class="col-3">
                <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        unchecked-value="bug"
                        value="idea"
                >
                    Type: <strong>{{ status }}</strong>
                </b-form-checkbox>

                <div></div>
            </div>
            <div class="col-3">
                <b-button block class="mt-2 block" variant="primary" @click="postIdea">Envoyer</b-button>
            </div>
        </b-row>
        <b-row align-v="center" align-h="center" v-if="ideas.length > 0" class="mt-4">
            <div class="col-10">
                <b-table align-h="center" align-v="center" :class="isDark ?'bg-dark text-light' : ''" :fields="fields" :items="ideas">
                    <template #cell(icon)="row">
                        <b-button v-if="!deleteButton" variant="danger" @click="securityDelete">
                            <i class="ti ti-trash"></i>
                        </b-button>
                        <b-button v-if="deleteButton" variant="danger" @click="deleteIdea(row.item._id)">Really ?</b-button>
                    </template>
                </b-table>
            </div>
        </b-row>
        <p v-else class="mt-4">Aucune idée</p>
    </div>
</template>
<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
    name: "ReportsView",
    data() {
        return {
            deleteButton: false,
            textIdea: "",
            ideas: [],
            status: 'bug',
            fields: [
                {
                    key: "type",
                    sortable: true
                },
                {
                    key: "idea_text",
                    sortable: true
                },
                {
                    key: "icon",
                    sortable: true
                }
            ]
        }
    },
    created() {
        this.getIdeas();
    },
    computed: {
        ...mapState(["isDark"])
    },
    methods: {
        postIdea() {
            axios.post("https://spotless-ant-beret.cyclic.app/ideas",
                {
                    idea_text: this.textIdea,
                    type: this.status
                })
                .then((res) => {
                    console.log(res);
                    this.getIdeas();
                    this.textIdea = "";
                })
                .catch((err) => {
                    console.log("axios post idea err: ", err);
                    this.textIdea = "ERROR";
                })
        },
        getIdeas() {
            axios.get("https://spotless-ant-beret.cyclic.app/ideas")
                .then((res) => {
                    this.ideas = res.data;
                    console.log("ideas from bdd: ", res.data);
                })
                .catch((err) => {
                    console.log("axios fetch ideas: ", err);
                })
        },
        deleteIdea(id) {
            axios
                .delete(`https://spotless-ant-beret.cyclic.app/ideas/${id}`)
                .then((res) => {
                    this.ideas = res.data;
                    console.log("idea deleted: ", res.data);
                    this.getIdeas();
                    this.deleteButton = false;
                })
                .catch((err) => {
                    console.log("fail to delete idea: ", err);
                })
        },
        securityDelete() {
            this.deleteButton = true;
        }
    }
}
</script>