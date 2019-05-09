var time = [0];
var t_time = [0];
var vals = [];
var state = []
var timerVar;
var t_timerVar;


function start_timer() {
  clearInterval(timerVar)
  clearInterval(t_timerVar)
  pre_count = [0]
  if ($('#precount').prop('checked')==true) {
    pre_count = [5];

  } 
  state = [0, 1, 0]

  vals = [parseInt($('#num_rounds').val()), // 0
    parseInt($('#num_sets').val()), // 1
    parseInt($('#time_active_m').val()) * 60 + parseInt($('#time_active_s').val()), // 2
    parseInt($('#time_rest_m').val()) * 60 + parseInt($('#time_rest_s').val()), // 3
    parseInt($('#set_rest_m').val()) * 60 + parseInt($('#set_rest_s').val()) // 4
  ]

  t_time = [vals[0] * vals[2] +
    (vals[0] - 1) * vals[3] +
    (vals[1] - 1) * vals[4] +
    pre_count[0]
  ]
console.log([pre_count])
  $('#time').css('color','blue')
  timerVar = setInterval(function() {
    count_down('time', pre_count)
  }, 1000)
  t_timerVar = setInterval(function() {
    count_down('t_time', t_time)
  }, 1000)

}

function update_ui(color) {
  $('#round').html(state[0]);
  $('#set').html(state[1]);
  $('#time').css('color',color)
  if(color == 'black'){
    $('#time').html('00:00')
    $('#t_time').html('00:00')
  }
}

function next_operation() {
  console.log(state)
  console.log(vals)
  if (state[0] == 0) {
    active_time = [vals[2]]
    timerVar = setInterval(function() {
      count_down('time', active_time)
    }, 1000)
    state[0] += 1
    color = 'red'
  } else if (state[0] > state[2]) {
    if (vals[0] == state[0] && vals[1] < state[1]) {
      rest_time = [vals[4]]

      timerVar = setInterval(function() {
        count_down('time', rest_time)
      }, 1000)
      state[0] = 0
      state[1] += 1
      state[2] = 0
      color = 'green'
    } else if (vals[0] == state[0] && vals[1] == state[1]){
      color = 'black'
    }
    else {
      rest_time = [vals[3]];
      timerVar = setInterval(function() {
        count_down('time', rest_time)
      }, 1000)
      state[2] += 1
      color = 'green'
    }


  } else if(state[0] == state[2]){
    active_time = [vals[2]]
    timerVar = setInterval(function() {
      count_down('time', active_time)
    }, 1000)
    state[0] += 1
    color = 'red'

  }else{
    $('#time').html('00:00')
    color = 'black'
  }
  setTimeout(function(){update_ui(color)},1000)
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

  if (t[0] == 1) {
    if (obj == 'time') {
      clearInterval(timerVar)

    } else {
      clearInterval(t_timerVar)
    }
    next_operation()
  }

  $('#' + obj).html(pad(Math.floor(t / 60), 2) + ':' + pad(t % 60, 2));
  t[0] = t[0] - 1;

}

function pad(a, b) {
  return (1e15 + a + "").slice(-b)
}
