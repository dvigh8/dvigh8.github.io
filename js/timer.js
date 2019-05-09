var time = [0];
var t_time = [0];
var vals = [];
var state = []
var pre_count = [5];
var timerVar;
var t_timerVar;

function start_timer() {
  if ($('#precount').prop('checked')) {
    pre_count = [5];
  } else {
    pre_count = [0];
  }
  state = [0, 0, 'a']

  vals = [$('#num_rounds').val(), // 0
    $('#num_sets').val(), // 1
    $('#time_active_m').val() * 60 + $('#time_active_s').val(), // 2
    $('#time_rest_m').val() * 60 + $('#time_rest_s').val(), // 3
    $('#set_rest_m').val() * 60 + $('#set_rest_s').val() // 4
  ]

  t_time = [vals[0] * vals[2] +
    (vals[0] - 1) * vals[3] +
    (vals[1] - 1) * vals[4] +
    pre_count[0]
  ]

  update_ui()
  timerVar = setInterval(function() {
    count_down('time', pre_count)
  }, 1000)
  t_timerVar = setInterval(function() {
    count_down('t_time', t_time)
  }, 1000)

}

function update_ui() {
  $('#round').html(state[0]);
  $('#set').html(state[1]);
}

function next_operation() {
  switch (state[2]) {
    case 'a':
      state[2] = 'r';
      if (state[0] == 0) {
        state[1] += 1;
      }
      state[0] += 1
      active_time = [vals[2]]
      timerVar = setInterval(function() {
        count_down('time', active_time)
      }, 1000)


      break;
    case 'r':
      state[2] = 'a';
      rest_time = []
      if (state[0] == vals[0]) {
        rest_time = [vals[4]]
        if (state[1] == vals[1]) {
          $('#time').html('00:00')
        } else {
          timerVar = setInterval(function() {
            count_down('time', rest_time)
          }, 1000)
        }
      } else {
        rest_time = [vals[3]]
        timerVar = setInterval(function() {
          count_down('time', rest_time)
        }, 1000)
      }


      break;

    default:
      $('#time').html('00:00')
  }
  update_ui()
}

function presets(t) {
  if (t == 'tabata') {
    $('#num_rounds').val(8);
    $('#time_active_m').val(0);
    $('#time_active_s').val(20);
    $('#time_rest_m').val(0);
    $('#time_rest_s').val(10);
    $('#num_sets').val(1);
    $('#set_rest_m').val(0);
    $('#set_rest_s').val(0);
  }
}

function count_down(obj, t) {
  if (t[0] == 0) {
    if (obj == 'time') {
      clearInterval(timerVar)

    } else {
      clearInterval(t_timerVar)
      $('#t_time').html('00:00')
    }
    next_operation()
  } else {

    $('#' + obj).html(pad(Math.floor(t / 60), 2) + ':' + pad(t % 60, 2));
    t[0] = t[0] - 1;
  }
}

function pad(a, b) {
  return (1e15 + a + "").slice(-b)
}
