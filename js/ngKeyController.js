angular.module('keyGenApp', [])
  .controller('ngKeyController', function () {
    // var
    var data = this;

    // init
    data.keys = [];
    data.gens = [
      {
        title: 'PIN', name: 'pin', placeholder: 'xxxx',
        size: [4, 8], size_selected: 0,
        type: [{ title: 'Lowers', selected: false }, { title: 'Uppers', selected: false }, { title: 'Numbers', selected: true }]
      },
      {
        title: 'GUID / UUID', name: 'guid', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        size: [32], size_selected: 0,
        type: [{ title: 'Lowers', selected: true }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }]
      },
      {
        title: 'Windows CD', name: 'cd', placeholder: 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx',
        size: [25], size_selected: 0,
        type: [{ title: 'Lowers', selected: false }, { title: 'Uppers', selected: true }, { title: 'Numbers', selected: true }]
      }
    ];

    // function
    data.addKey = function (k, t) {
      data.keys.push({ key: k, type: t });
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

      var template = "";
      for (var i = 0; i < data.gens[index].type.length; i++) {
        if (i == 0 && data.gens[index].type[i].selected) {
          template += template_1;
        } else if (i == 1 && data.gens[index].type[i].selected) {
          template += template_2;
        } else if (i == 2 && data.gens[index].type[i].selected) {
          template += template_3;
        }
      }

      console.log(template);

      return template;
    };

    data.generate = function (index) {
      var key = '';
      if (data.gens[index].name == 'pin') {
        key = data.gen_pin(index);
      } else if (data.gens[index].name == 'guid') {
        key = data.gen_guid(index);
      } else if (data.gens[index].name == 'cd') {
        key = data.gen_cd(index);
      }

      document.getElementById('input_' + index).value = key;
      data.addKey(key, data.gens[index].title);
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