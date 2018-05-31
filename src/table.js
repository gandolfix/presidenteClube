Vue.component('demo-grid', {
    template: 
    `
    <table>
    <col width="150">
    <col width="100">
    <col width="100">
    <thead>
        <tr>
        <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
        </th>
        <th>Pago</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(entry,row) in filteredData">
        <td v-for="key in columns">
            {{entry[key]}}
        </td>
        <td :class="{ active: filteredData[row].pago == 1 }"><input
            id="checkbox"
            type="checkbox"
            :checked="filteredData[row].pago"
        />
        </td>
        </tr>
    </tbody>
    </table>
    `,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function () {
        var sortOrders = {}
        this.columns.forEach(function (key) {
            sortOrders[key] = 1
        })
        return {
            sortKey: '',
            sortOrders: sortOrders
        }
    },
    computed: {
        filteredData: function () {
            var sortKey = this.sortKey
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            var order = this.sortOrders[sortKey] || 1
            var data = this.data
            if (filterKey) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    if(a[sortKey] > b[sortKey]){
                        return 1 * order
                    }else if(a[sortKey] < b[sortKey]){
                        return -1 * order
                    }else{
                        a = a["jogos"]
                        b = b["jogos"]
                    }
                    return (a === b ? 0 : a > b ? -1 : 1) * order								
                })
            }
            return data
        }
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
})
