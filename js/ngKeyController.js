angular.module('keyGenApp', [])
  .controller('ngKeyController', function () {
    // var
    var data = this;

    // init
    data.keys = [];
    data.gens = [
      {
        title: 'PIN', name: 'pin', placeholder: 'xxxx',
        size: [4], size_selected: 0,
        type: [{ title: 'Lowers', selected: false }, { title: 'Uppers', selected: false }, { title: 'Numbers', selected: true }, { title: 'Symbols', selected: false }]
      },
      {
        title: 'WEP', name: 'wep', placeholder: 'xxxxxxxxxx',
        size: [10, 26, 58], size_selected: 0,
        type: [{ title: 'Lowers', selected: false }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }, { title: 'Symbols', selected: false }]
      },
      {
        title: 'WPA', name: 'wpa', placeholder: 'xxxxxxxxxx',
        size: [10, 26, 58], size_selected: 0,
        type: [{ title: 'Lowers', selected: true }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }, { title: 'Symbols', selected: true }]
      },
      {
        title: 'GUID / UUID', name: 'guid', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        size: [32], size_selected: 0,
        type: [{ title: 'Lowers', selected: true }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }, { title: 'Symbols', selected: false }]
      },
      {
        title: 'Windows CD', name: 'cd', placeholder: 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx',
        size: [25], size_selected: 0,
        type: [{ title: 'Lowers', selected: false }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }, { title: 'Symbols', selected: false }]
      }
    ];
    data.alerts = [
      { 
        title:"Great,", text: "you have generate your first key, take this cooke.", 
        show: false, close: true, style: "success", icon: "fa fa-check-circle" 
      },
      { 
        title:"Slow down,", text: "you will break mine algorithms!", 
        show: false, close: true, style: "warning", icon: "fa fa-exclamation-triangle" 
      },
      { 
        title:"Ok, that's it,", text: "I am taking a break, you can generate only 100k more keys before break!", 
        show: false, close: true, style: "danger", icon: "fa fa-coffee" 
      },
      { 
        title:"This keys are private", text: "and only visible to you, they will disapper when you leave the app.", 
        show: true, close: false, style: "info", icon: "fa fa-exclamation-circle" 
      }
    ];

    // function
    data.addKey = function (k, t) {
      data.keys.unshift({ key: k, type: t });
    };

    data.copyToClipboard = function (index) {
      var copyText = document.getElementById('input_' + index);
      copyText.select();
      copyText.setSelectionRange(0, 99999); // for mobile devices

      if (copyText.value.length > 0) {
        document.execCommand("copy");
        alert("Copied to clipboard: " + copyText.value);
      }
    };

    data.template = function (index) {
      var template_1 = "abcdefghijklmnopqrstuvwxyz";
      var template_2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var template_3 = "0123456789";
      var template_4 = "@#$&%!?*-+()";

      var template = "";
      for (var i = 0; i < data.gens[index].type.length; i++) {
        if (data.gens[index].type[i].selected) {
          if (i == 0) {
            template += template_1;
          } else if (i == 1) {
            template += template_2;
          } else if (i == 2) {
            template += template_3;
          } else if (i == 3) {
            template += template_4;
          }
        }
      }

      return template;
    };

    data.generate = function (index) {
      var key = '';
      if (data.gens[index].name == 'guid') {
        key = data.gen_guid(index);
      } else if (data.gens[index].name == 'cd') {
        key = data.gen_cd(index);
      } else {
        key = data.gen_pin(index);
      }

      document.getElementById('input_' + index).value = key;
      data.addKey(key, data.gens[index].title);

      if (data.keys.length == 1) {
        data.alerts[0].show = true;
      } else if (data.keys.length == 2) {
        data.alerts[1].show = true;
      }  else if (data.keys.length == 3) {
        data.alerts[2].show = true;
      }
    };

    // generate
    data.gen_pin = function (index) {
      var template = data.template(index);
      var size = data.gens[index].size[data.gens[index].size_selected];

      var result = '';
      for (var j = 0; j < size; j++) {
        result = result + template[Math.floor(Math.random() * template.length)];
      }

      return result;
    };

    data.gen_guid = function (index) {
      var template = data.template(index);
      var size = data.gens[index].size[data.gens[index].size_selected];

      var result = [];
      for (var i = 0; i < size + 4; i++) {
        result[i] = template[Math.floor(Math.random() * template.length)];
      }
      result[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      result[19] = template.substr((result[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      result[8] = result[13] = result[18] = result[23] = "-";

      return result.join("");
    };

    data.gen_cd = function (index) {
      var template = data.template(index);
      var size = data.gens[index].size[data.gens[index].size_selected];

      var result = '';
      for (var i = 0; i < size; i++) {
        if (i > 0 && i % 5 == 0) {
          result = result + '-';
        }
        result = result + template[Math.floor(Math.random() * template.length)];
      }

      return result;
    };
  });