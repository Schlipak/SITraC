const isConnection = (self, station) => (self.name === station.name
    || self.additionalConnections.some(adc => adc.name === station.name))
  && (self.subName === station.subName
    || self.additionalConnections.some(adc => adc.subName === station.subName));

export const NodeType = {
  STATION: 'STATION',
  FORK: 'FORK',
};

export const Station = (name, subName = null, ...additionalConnections) => ({
  type: NodeType.STATION,

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

export const Fork = (station, ...branches) => ({
  type: NodeType.FORK,
  station,
  branches,
});

export const Branch = (...stations) => ({ id: null, stations });

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
  longName: null,
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

export const applyStationIds = (lineName, stations, offset = 0) => {
  stations.forEach((node, i) => {
    switch (node.type) {
    case NodeType.STATION:
      node.id = `${lineName}-${i + 1 + offset}`;
      break;
    case NodeType.FORK: {
      node.station.id = `${lineName}-${i + 1 + offset}`;

      let currentOffset = i + offset;
      return node.branches.forEach((branch) => {
        branch.id = `${lineName}-branch-${i + 1 + currentOffset}`;
        applyStationIds(lineName, branch.stations, currentOffset + 1);
        currentOffset += branch.stations.length;
      });
    }
    default:
      throw new Error(`Invalid node type: ${node.type}`);
    }
  });
};

export const computeConnections = (lines, line, stations) => {
  stations.forEach((node) => {
    switch (node.type) {
    case NodeType.STATION:
      node.computeConnections(lines, line);
      break;
    case NodeType.FORK:
      node.station.computeConnections(lines, line);
      return node.branches.forEach(branch => computeConnections(lines, line, branch.stations));
    default:
      throw new Error(`Invalid node type: ${node.type}`);
    }
  });
};

export const Network = (...lines) => {
  lines.forEach((line) => {
    applyStationIds(line.name, line.stations);
  });

  lines.forEach((line) => {
    if (!line.options.skipConnections) {
      computeConnections(lines, line, line.stations);
    }
  });

  return lines;
};

export const getStationFromNode = (node) => {
  switch (node.type) {
  case NodeType.STATION:
    return node;
  case NodeType.FORK:
    return node.station;
  default:
    throw new Error(`Invalid node type: ${node.type}`);
  }
};
