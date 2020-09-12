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
  delimiters: ['[[',']]']
})