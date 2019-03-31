const isConnection = (self, station) => (self.name === station.name
    || self.additionalConnections.some(adc => adc.name === station.name))
  && (self.subName === station.subName
    || self.additionalConnections.some(adc => adc.subName === station.subName));

export const Station = (name, subName = null, ...additionalConnections) => ({
  id: null,
  name,
  subName,
  additionalConnections,

  connections: {},

  same(other) {
    return this.name === other.name && this.subName === other.subName;
  },

  computeConnections(network, currentLine) {
    network.forEach((line) => {
      if (line !== currentLine && !line.options.skipConnections) {
        line.stations.forEach((station) => {
          if (isConnection(this, station)) {
            const { stations: _, type, ...lineProps } = line;
            const { connections: __, ...stationProps } = station;

            if (!this.connections[type]) {
              this.connections[type] = [];
            }

            if (
              !this.connections[type].some(con => line.same(con.line) && station.same(con.station))
            ) {
              this.connections[type].push({
                line: { type, ...lineProps },
                station: stationProps,
              });
            }
          }
        });
      }
    });
  },
});

export const WalkTo = (name, subName) => ({ name, subName });

export const LineType = {
  BUS_RAPID_TRANSIT: 'BUS_RAPID_TRANSIT',
  BUS: 'BUS',
  CABLE_CAR: 'CABLE_CAR',
  GUIDED_BUS: 'GUIDED_BUS',
  HIGH_SPEED_TRAIN: 'HIGH_SPEED_TRAIN',
  METRO_TRAM: 'METRO_TRAM',
  METRO: 'METRO',
  MONORAIL: 'MONORAIL',
  OVERGROUND: 'OVERGROUND',
  PEOPLE_MOVER: 'PEOPLE_MOVER',
  TRAIN: 'TRAIN',
  TRAM_TRAIN: 'TRAM_TRAIN',
  TRAM: 'TRAM',
  TROLLEYBUS: 'TROLLEYBUS',
};

export const LineOptions = {
  shape: 'circle',
  background: 'red',
  foreground: 'white',
};

export const Line = (type, name, options, ...stations) => ({
  type,
  name,
  options: { ...LineOptions, ...options },
  stations,

  same(other) {
    return this.type === other.type && this.name === other.name;
  },
});

export const Network = (...lines) => {
  lines.forEach((line) => {
    line.stations.forEach((station, i) => (station.id = `${line.name}-${i + 1}`));
  });

  lines.forEach((line) => {
    if (!line.options.skipConnections) {
      line.stations.forEach(station => station.computeConnections(lines, line));
    }
  });

  return lines;
};
