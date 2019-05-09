var t_time = [0];
var vals = {}
var state = {}
var timerVar;
var t_timerVar;
var sound;


function start_timer() {
  clearInterval(timerVar)
  clearInterval(t_timerVar)

  sound = new Audio('../audio/beep.wav')

  state = {
    'round': 0,
    'set': 1,
    'rest': 0
  }

  vals = {
    'rounds': parseInt($('#num_rounds').val()), // 0
    'sets': parseInt($('#num_sets').val()), // 1
    'time_active': parseInt($('#time_active_m').val()) * 60 + parseInt($('#time_active_s').val()), // 2
    'time_rest': parseInt($('#time_rest_m').val()) * 60 + parseInt($('#time_rest_s').val()), // 3
    'set_rest': parseInt($('#set_rest_m').val()) * 60 + parseInt($('#set_rest_s').val()) // 4
  }

  t_timerVar = setInterval(function() {
    count_down('t_time', t_time)
  }, 1000)

  pre_time = [5];
  timerVar = setInterval(function() {
    count_down('time', pre_time)
    $('#time').css('color', 'blue')
  }, 1000)

  t_time = [vals['rounds'] * vals['time_active'] * vals['sets'] +
    (vals['rounds'] - 1) * vals['time_rest'] * vals['sets'] +
    (vals['sets'] - 1) * vals['set_rest'] +
    pre_time[0]
  ]
}

function update_ui(color) {

  $('#round').html(state['round']);
  $('#set').html(state['set']);
  $('#time').css('color', color)

  if (color == 'black') {
    $('#time').html('00:00')
    $('#t_time').html('00:00')

    clearInterval(timerVar)
    clearInterval(t_timerVar)
  }

  sound.play();
}

function next_operation() {

  if (state['round'] == state['rest'] && state['rest'] != vals['rounds']) {

    t_timerVar = setInterval(function() {
      count_down('t_time', t_time)
    }, 1000)

    active_time = [vals['time_active']]
    timerVar = setInterval(function() {
      count_down('time', active_time)
    }, 1000)

    state['round'] += 1
    color = 'red'

  } else if (state['round'] > state['rest']) {
    if (vals['rounds'] == state['round'] && vals['sets'] > state['set']) {

      rest_time = [vals['set_rest']]
      state['round'] = 0
      state['set'] += 1
      state['rest'] = 0
      color = 'blue'

      if (rest_time != 0) {

        t_timerVar = setInterval(function() {
          count_down('t_time', t_time)
        }, 1000)
        timerVar = setInterval(function() {
          count_down('time', rest_time)
        }, 1000)

      } else {
        next_operation()
      }
    } else if (vals['rounds'] == state['round'] && vals['sets'] == state['set']) {
      color = 'black'

    } else {

      t_timerVar = setInterval(function() {
        count_down('t_time', t_time)
      }, 1000)

      rest_time = [vals['time_rest']];
      timerVar = setInterval(function() {
        count_down('time', rest_time)
      }, 1000)

      state['rest'] += 1
      color = 'green'
    }
  }

  setTimeout(function() {
    update_ui(color)
  }, 1000)
}

function presets(t) {
  if (t == 'tabata') {
    $('#num_rounds').val(8);
    $('#time_active_m').val(0);
    $('#time_active_s').val(20);
    $('#time_rest_m').val(0);
    $('#time_rest_s').val(10);
    $('#num_sets').val(1);
    $('#set_rest_m').val(1);
    $('#set_rest_s').val(0);

  } else if (t == 't') {
    $('#num_rounds').val(2);
    $('#time_active_m').val(0);
    $('#time_active_s').val(10);
    $('#time_rest_m').val(0);
    $('#time_rest_s').val(5);
    $('#num_sets').val(2);
    $('#set_rest_m').val(0);
    $('#set_rest_s').val(10);

  }
}

function count_down(obj, t) {
  if (t[0] <= 1) {
    if (obj == 'time') {
      clearInterval(timerVar)
      clearInterval(t_timerVar)
    } else {
      clearInterval(t_timerVar)
    }
    next_operation()

  }

  $('#' + obj).html(pad(Math.floor(t[0] / 60), 2) + ':' + pad(t[0] % 60, 2));
  t[0] = t[0] - 1;

}

function pad(a, b) {
  return (1e15 + a + "").slice(-b)
}
