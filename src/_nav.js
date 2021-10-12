

export default {
  items: [
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
    {
      title: true,
      name: 'Feedback',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Generate Feedback',
      icon: 'icon-present',
      children: [
        {
          name: 'Generate Feedback',
          url: '/generate_feedback',
          icon: 'icon-list',
        },


      ],
    },
    // {
    //   title: true,
    //   name: 'Job Management',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'Job Management',
    //   icon: 'icon-present',
    //   children: [
    //     // {
    //     //   name: 'Inventory List',
    //     //   url: '/inventorylist',
    //     //   icon: 'icon-list',
    //     // },
    //
    //   ],
    // },



  ],
};




