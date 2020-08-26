/**
 * @fileoverview gRPC-Web generated client stub for com.bht.saigonparking.api.grpc.parkinglot
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.com = {};
proto.com.bht = {};
proto.com.bht.saigonparking = {};
proto.com.bht.saigonparking.api = {};
proto.com.bht.saigonparking.api.grpc = {};
proto.com.bht.saigonparking.api.grpc.parkinglot = require('./ParkingLot_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse>}
 */
const methodDescriptor_ParkingLotService_countAllParkingLotGroupByType = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLotGroupByType',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse>}
 */
const methodInfo_ParkingLotService_countAllParkingLotGroupByType = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.countAllParkingLotGroupByType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLotGroupByType',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_countAllParkingLotGroupByType,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotGroupByTypeResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.countAllParkingLotGroupByType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLotGroupByType',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_countAllParkingLotGroupByType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_ParkingLotService_getParkingLotIdByAuthorizationHeader = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByAuthorizationHeader',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_ParkingLotService_getParkingLotIdByAuthorizationHeader = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getParkingLotIdByAuthorizationHeader =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByAuthorizationHeader',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotIdByAuthorizationHeader,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getParkingLotIdByAuthorizationHeader =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByAuthorizationHeader',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotIdByAuthorizationHeader);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_ParkingLotService_getParkingLotIdByParkingLotEmployeeId = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByParkingLotEmployeeId',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_ParkingLotService_getParkingLotIdByParkingLotEmployeeId = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getParkingLotIdByParkingLotEmployeeId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByParkingLotEmployeeId',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotIdByParkingLotEmployeeId,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getParkingLotIdByParkingLotEmployeeId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotIdByParkingLotEmployeeId',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotIdByParkingLotEmployeeId);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_ParkingLotService_countAllParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_ParkingLotService_countAllParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.countAllParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_countAllParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.CountAllParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.countAllParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/countAllParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_countAllParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse>}
 */
const methodDescriptor_ParkingLotService_getAllParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getAllParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest,
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse>}
 */
const methodInfo_ParkingLotService_getAllParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getAllParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getAllParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getAllParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.GetAllParkingLotResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getAllParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getAllParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getAllParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit>}
 */
const methodDescriptor_ParkingLotService_checkLimit = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkLimit',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit>}
 */
const methodInfo_ParkingLotService_checkLimit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.checkLimit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkLimit',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkLimit,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotLimit>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.checkLimit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkLimit',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkLimit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodDescriptor_ParkingLotService_checkAvailability = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkAvailability',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodInfo_ParkingLotService_checkAvailability = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.BoolValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.BoolValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.checkAvailability =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkAvailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkAvailability,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.BoolValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.checkAvailability =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkAvailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkAvailability);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList>}
 */
const methodDescriptor_ParkingLotService_checkUnavailability = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkUnavailability',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList>}
 */
const methodInfo_ParkingLotService_checkUnavailability = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.checkUnavailability =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkUnavailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkUnavailability,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotIdList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.checkUnavailability =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkUnavailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkUnavailability);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 */
const methodDescriptor_ParkingLotService_getParkingLotById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotById',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 */
const methodInfo_ParkingLotService_getParkingLotById = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getParkingLotById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotById,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getParkingLotById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 */
const methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithName = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithName',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 */
const methodInfo_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithName = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getTopParkingLotInRegionOrderByDistanceWithName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithName',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithName,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getTopParkingLotInRegionOrderByDistanceWithName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithName',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 */
const methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithoutName = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithoutName',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 */
const methodInfo_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithoutName = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getTopParkingLotInRegionOrderByDistanceWithoutName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithoutName',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithoutName,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ScanningByRadiusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotResultList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getTopParkingLotInRegionOrderByDistanceWithoutName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getTopParkingLotInRegionOrderByDistanceWithoutName',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getTopParkingLotInRegionOrderByDistanceWithoutName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParkingLotService_deleteParkingLotById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteParkingLotById',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ParkingLotService_deleteParkingLotById = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.deleteParkingLotById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_deleteParkingLotById,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.deleteParkingLotById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_deleteParkingLotById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParkingLotService_deleteMultiParkingLotById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteMultiParkingLotById',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ParkingLotService_deleteMultiParkingLotById = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.deleteMultiParkingLotById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteMultiParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_deleteMultiParkingLotById,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.DeleteMultiParkingLotByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.deleteMultiParkingLotById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/deleteMultiParkingLotById',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_deleteMultiParkingLotById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParkingLotService_updateParkingLotAvailability = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/updateParkingLotAvailability',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ParkingLotService_updateParkingLotAvailability = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.updateParkingLotAvailability =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/updateParkingLotAvailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_updateParkingLotAvailability,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.UpdateParkingLotAvailabilityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.updateParkingLotAvailability =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/updateParkingLotAvailability',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_updateParkingLotAvailability);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse>}
 */
const methodDescriptor_ParkingLotService_mapToParkingLotNameMap = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/mapToParkingLotNameMap',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest,
  proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse>}
 */
const methodInfo_ParkingLotService_mapToParkingLotNameMap = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.mapToParkingLotNameMap =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/mapToParkingLotNameMap',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_mapToParkingLotNameMap,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.MapToParkingLotNameMapResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.mapToParkingLotNameMap =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/mapToParkingLotNameMap',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_mapToParkingLotNameMap);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.StringValue>}
 */
const methodDescriptor_ParkingLotService_getParkingLotNameByParkingLotId = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotNameByParkingLotId',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_ParkingLotService_getParkingLotNameByParkingLotId = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.StringValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getParkingLotNameByParkingLotId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotNameByParkingLotId',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotNameByParkingLotId,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.StringValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getParkingLotNameByParkingLotId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotNameByParkingLotId',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotNameByParkingLotId);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_ParkingLotService_createNewParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/createNewParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_ParkingLotService_createNewParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.createNewParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/createNewParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_createNewParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.createNewParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/createNewParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_createNewParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParkingLotService_addEmployeeOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/addEmployeeOfParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ParkingLotService_addEmployeeOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.addEmployeeOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/addEmployeeOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_addEmployeeOfParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.AddEmployeeOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.addEmployeeOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/addEmployeeOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_addEmployeeOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParkingLotService_removeEmployeeOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/removeEmployeeOfParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ParkingLotService_removeEmployeeOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.removeEmployeeOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/removeEmployeeOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_removeEmployeeOfParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.parkinglot.RemoveEmployeeOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.removeEmployeeOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/removeEmployeeOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_removeEmployeeOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodDescriptor_ParkingLotService_checkEmployeeAlreadyManageParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkEmployeeAlreadyManageParkingLot',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodInfo_ParkingLotService_checkEmployeeAlreadyManageParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.BoolValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.BoolValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.checkEmployeeAlreadyManageParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkEmployeeAlreadyManageParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkEmployeeAlreadyManageParkingLot,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.BoolValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.checkEmployeeAlreadyManageParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/checkEmployeeAlreadyManageParkingLot',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_checkEmployeeAlreadyManageParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse>}
 */
const methodDescriptor_ParkingLotService_getEmployeeManageParkingLotIdList = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getEmployeeManageParkingLotIdList',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse>}
 */
const methodInfo_ParkingLotService_getEmployeeManageParkingLotIdList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getEmployeeManageParkingLotIdList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getEmployeeManageParkingLotIdList',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getEmployeeManageParkingLotIdList,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.GetEmployeeManageParkingLotIdListResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getEmployeeManageParkingLotIdList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getEmployeeManageParkingLotIdList',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getEmployeeManageParkingLotIdList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 */
const methodDescriptor_ParkingLotService_getParkingLotManagedByEmployee = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotManagedByEmployee',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 */
const methodInfo_ParkingLotService_getParkingLotManagedByEmployee = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServiceClient.prototype.getParkingLotManagedByEmployee =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotManagedByEmployee',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotManagedByEmployee,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLot>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.parkinglot.ParkingLotServicePromiseClient.prototype.getParkingLotManagedByEmployee =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.parkinglot.ParkingLotService/getParkingLotManagedByEmployee',
      request,
      metadata || {},
      methodDescriptor_ParkingLotService_getParkingLotManagedByEmployee);
};


module.exports = proto.com.bht.saigonparking.api.grpc.parkinglot;

