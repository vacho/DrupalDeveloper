apiURL = "/api/content"
new Vue({
  el: '#app',

  data: {
      hello: 'This text can be change!',
      names: [
          {firstname: 'Noah', lastname:'Doe'},
          {firstname: 'James', lastname:'Smith'},
          {firstname: 'Oliver', lastname:'Campbell'}
      ]
  },
  ready: function(){
    this.getContent();
  },
  methods: {
    getContent: function(){
        this.$http.get(apiURL, function(contents){
            this.$set('contents', contents);
            console.log(contents);
        });
    }
  },
  delimiters: ['[[',']]']
})