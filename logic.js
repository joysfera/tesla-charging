let minCur = 2;     // fetch from some UI ?
let doD = parseInt(global.get('homeassistant.homeAssistant.states[\"number.depth_of_discharge_on_grid\"].state'));
let minSOC = 15 + (100 - doD); // try to keep SOC 15 % above DOD
let voltage = 230;  // TODO read from GoodWe
let vyroba = global.get('homeassistant.homeAssistant.states[\"sensor.pv_power\"].state');
let spotreba = global.get('homeassistant.homeAssistant.states[\"sensor.house_consumption\"].state');
let soc = global.get('homeassistant.homeAssistant.states[\"sensor.battery_state_of_charge\"].state');
let currentAmps = parseInt(global.get('homeassistant.homeAssistant.states[\"number.anet_charging_amps\"].state'));
let volne = vyroba - spotreba;
let oneAmpPower = voltage * 3;
let spareAmps = Math.floor(volne / oneAmpPower);
if (soc > minSOC) spareAmps++;
let newAmps = currentAmps + spareAmps;
if (newAmps >= minCur)
    msg.payload = newAmps;
else
    msg.payload = minCur; // if occurs for too long then better stop charging
return msg;
