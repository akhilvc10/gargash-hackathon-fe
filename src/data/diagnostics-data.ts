export const diagnosticsData = {
  prediction: [
    {
      group: "Engine & Combustion System",
      anomaly: 1,
      sub_group: [
        {
          name: "Engine temperature",
          anomaly: 1,
        },
        {
          name: "RPM (Revolutions Per Minute)",
          anomaly: 0,
        },
        {
          name: "Throttle position",
          anomaly: 1,
        },
        {
          name: "Mass airflow (MAF)",
          anomaly: 0,
        },
        {
          name: "O2 sensor (Oxygen level in exhaust)",
          anomaly: 1,
        },
        {
          name: "Crankshaft/Camshaft position",
          anomaly: 0,
        },
        {
          name: "Fuel trim & fuel pressure",
          anomaly: 0,
        },
      ],
      description:
        "Frequent anomalies have been detected in Engine Temperature, Throttle Position, and O2 Sensor. We strongly recommend consulting a service expert immediately to prevent potential system failures.",
    },
    {
      group: "Transmission System",
      anomaly: 0,
      sub_group: [
        {
          name: "Transmission fluid temperature",
          anomaly: 0,
        },
        {
          name: "Gear position sensor",
          anomaly: 0,
        },
        {
          name: "Torque converter data",
          anomaly: 0,
        },
        {
          name: "Clutch wear (via pressure or actuation)",
          anomaly: 0,
        },
      ],
    },
    {
      group: "Braking System (ABS & EBD)",
      anomaly: 0,
      sub_group: [
        {
          name: "Brake pad wear sensors",
          anomaly: 0,
        },
        {
          name: "Wheel speed sensors (for ABS)",
          anomaly: 0,
        },
        {
          name: "Hydraulic brake pressure",
          anomaly: 0,
        },
        {
          name: "Brake fluid level sensor",
          anomaly: 0,
        },
      ],
    },
    {
      group: "Battery & Electrical System",
      anomaly: 1,
      sub_group: [
        {
          name: "Battery voltage and current",
          anomaly: 1,
        },
        {
          name: "Alternator output",
          anomaly: 0,
        },
        {
          name: "Battery temperature",
          anomaly: 0,
        },
        {
          name: "Charging cycles",
          anomaly: 0,
        },
      ],
      description:
        "Abnormal readings in battery voltage/current. May affect starting or electronics. Service check advised soon.",
    },
    {
      group: "Tires & Suspension",
      anomaly: 0,
      sub_group: [
        {
          name: "Tire pressure monitoring sensors (TPMS)",
          anomaly: 0,
        },
        {
          name: "Wheel alignment sensors",
          anomaly: 0,
        },
        {
          name: "Suspension compression sensor (adaptive)",
          anomaly: 0,
        },
      ],
    },
    {
      group: "HVAC System",
      anomaly: 0,
      sub_group: [
        {
          name: "Cabin temperature sensor",
          anomaly: 0,
        },
        {
          name: "Blower motor sensor",
          anomaly: 0,
        },
        {
          name: "Evaporator temperature",
          anomaly: 0,
        },
        {
          name: "Refrigerant pressure sensor",
          anomaly: 0,
        },
      ],
    },
    {
      group: "Driving Behavior & Road Conditions",
      anomaly: 0,
      sub_group: [
        {
          name: "GPS and speed data",
          anomaly: 0,
        },
        {
          name: "Accelerometer & Gyroscope (via telematics)",
          anomaly: 0,
        },
        {
          name: "Hard braking / rapid acceleration events",
          anomaly: 0,
        },
      ],
    },
    {
      group: "Exhaust System",
      anomaly: 0,
      sub_group: [
        {
          name: "Catalytic converter temperature",
          anomaly: 0,
        },
        {
          name: "NOx and CO2 emission levels",
          anomaly: 0,
        },
        {
          name: "DPF (Diesel Particulate Filter) clog level",
          anomaly: 0,
        },
      ],
    },
    {
      group: "Lighting & Auxiliary Systems",
      anomaly: 1,
      sub_group: [
        {
          name: "Headlight & tail light status",
          anomaly: 0,
        },
        {
          name: "Turn signal and brake light functioning",
          anomaly: 1,
        },
        {
          name: "Wiper blade usage patterns",
          anomaly: 0,
        },
      ],
      description: "Turn signal or brake light issue detected. Check immediately to ensure road safety.",
    },
    {
      group: "Odometer / Distance Sensor",
      anomaly: 1,
      sub_group: [
        {
          name: "Total kilometers/miles driven (Odometer)",
          anomaly: 0,
        },
        {
          name: "Trip distance",
          anomaly: 0,
        },
        {
          name: "Time since last service (in km)",
          anomaly: 1,
        },
      ],
      description: "Service overdue based on distance driven. Schedule maintenance soon to avoid wear-related issues.",
    },
  ],
}
