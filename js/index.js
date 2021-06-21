const baseUrl = "https://bhopsrest.azurewebsites.net/api/hops"
// const sortUrl = "https://bhopsrest.azurewebsites.net/api/hops?sortby=alphaacid"
// const filterUrl = "https://bhopsrest.azurewebsites.net/api/hops?maxprice="

Vue.createApp({
    data() {
        return {
            hops: [],
            sorthops: [],
            filterhops: [],
            id: 0,
            name: "",
            alphaacid: 0,
            harvestyear: 0,
            price: 0,
            errormessage: "",
            succesmessage: "",
            singleHop: null,
            addData: { name: "", alphaacid: 0, harvestyear: 0, price: 0, stock: 0},
            updateData: { id: 0, name: "", alphaacid: 0, harvestyear: 0, price: 0, stock: 0},
            deleteId: 0,
            maxPrice: 0

        }
    },

    methods: {
        async helperGetHops(url){
            this.errormessage = "Could not find hops"
            try{
                const response = await axios.get(url)
                this.hops = await response.data
            } catch {
                alert(this.errormessage)
            }
        },

        async helperSortHops(url){
            this.errormessage = "Could not find hops"
            try{
                const response = await axios.get(url)
                this.sorthops = await response.data
            } catch {
                alert(this.errormessage)
            }
        },

        async helperFilterHops(url){
            this.errormessage = "No hops with this price."
            try{
                // const response = await axios.get(url + this.maxPrice)
                const response = await axios.get(url)
                this.filterhops = await response.data
            } catch {
                alert(this.errormessage)
            }
        },

        getAllHops(){
            this.helperGetHops(baseUrl)
        },

        // sortHops(){
        //     this.helperSortHops(sortUrl)
        // },

        sortHops(){
            const url = baseUrl + "?sortby=alphaacid"
            this.helperSortHops(url)
        },

        // filterHops(){
        //     this.helperFilterHops(filterUrl)
        // },

        filterHops(){
            const url = baseUrl + "?maxprice=" + this.maxPrice
            this.helperFilterHops(url)
        },

        async getById(id){
            const url = baseUrl + "/" + id
            this.errormessage = "No hop with that ID."
            try{
                response = await axios.get(url)
                this.singleHop = await response.data
            } catch {
                alert(this.errormessage)
            }
        },

        async addHop(){
            this.errormessage = "Failed to add hop."
            this.succesmessage = "Hop has been added succesfully!"
            try{
                respone = await axios.post(baseUrl, this.addData)
                alert(this.succesmessage)
                this.getAllHops()
            } catch {
                alert(this.errormessage)
            }
        },

        async deleteHop(deleteId){
            const url = baseUrl + "/" + deleteId
            this.errormessage = "Failed to delete hop."
            this.succesmessage = "Hop has been deleted succesfully!"
            try{
                response = await axios.delete(url)
                alert(this.succesmessage)
                this.getAllHops()
            } catch {
                alert(this.errormessage)
            }
        },

        async updateStock(){
            const url = baseUrl + "/" + this.updateData.id
            this.errormessage = "Failed to update stock."
            this.succesmessage = "Stock has been updated succesfully!"
            try{
                response = await axios.put(url, this.updateData)
                alert(this.succesmessage)
                this.getAllHops()
            } catch {
                alert(this.errormessage)
            }
        }
    }

}).mount("#app")