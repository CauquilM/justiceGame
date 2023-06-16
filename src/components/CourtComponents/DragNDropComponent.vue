<template>
    <div class="w-75 mt-4">
        <div class="row justify-content-center">
            <div
                class="col-lg-4 drag-n-drop-card"
                @dragover="allowDrop($event)"
                @drop="drop($event, 'list1')"
            >
                <p style="font-weight: bold">Niveau 1</p>
                <div
                    v-for="item in list1"
                    :key="item.id"
                    class="drag-n-drop-items mt-3 mb-3"
                    draggable="true"
                    @dragstart="drag($event, item)"
                >
                    {{ item.name }}
                </div>
            </div>
            <div
                class="col-lg-4 drag-n-drop-card"
                @dragover="allowDrop($event)"
                @drop="drop($event, 'list2')"
            >
                <p style="font-weight: bold">Niveau 1</p>
                <div
                    v-for="item in list2"
                    :key="item.id"
                    class="drag-n-drop-items mt-3 mb-3"
                    draggable="true"
                    @dragstart="drag($event, item)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DragNDropComponent",
    data() {
        return {
            list1: [
                { id: "0", name: "Chaise" },
                { id: "1", name: "Tabouret" },
                { id: "2", name: "Manette" },
            ],
            list2: [],
        };
    },
    methods: {
        drag(event, item) {
            event.dataTransfer.setData("text/plain", JSON.stringify(item));
        },
        drop(event, list) {
            event.preventDefault();
            const data = event.dataTransfer.getData("text/plain");
            const item = JSON.parse(data);

            if (list === "list2") {
                this.list1 = this.list1.filter((i) => i.id !== item.id);
            } else if (list === "list1") {
                this.list2 = this.list2.filter((i) => i.id !== item.id);
            }

            this[list].push(item);
        },
        allowDrop(event) {
            event.preventDefault();
            event.dataTransfer.effectAllowed = "move";
        },
    },
};
</script>
