/**
 * @fileoverview gRPC-Web generated client stub for com.bht.saigonparking.api.grpc.user
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
proto.com.bht.saigonparking.api.grpc.user = require('./Actor_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient =
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
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient =
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
 *   !proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_UserService_countAllUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/countAllUser',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest} request
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
 *   !proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_UserService_countAllUser = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.countAllUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/countAllUser',
      request,
      metadata || {},
      methodDescriptor_UserService_countAllUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.CountAllUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.countAllUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/countAllUser',
      request,
      metadata || {},
      methodDescriptor_UserService_countAllUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest,
 *   !proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse>}
 */
const methodDescriptor_UserService_getAllUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/getAllUser',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest,
  proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest,
 *   !proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse>}
 */
const methodInfo_UserService_getAllUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.getAllUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getAllUser',
      request,
      metadata || {},
      methodDescriptor_UserService_getAllUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.GetAllUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.GetAllUserResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.getAllUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getAllUser',
      request,
      metadata || {},
      methodDescriptor_UserService_getAllUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.user.User>}
 */
const methodDescriptor_UserService_getUserById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/getUserById',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.user.User,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.user.User>}
 */
const methodInfo_UserService_getUserById = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.User,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.User.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.getUserById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_getUserById,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.User>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.getUserById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_getUserById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.user.User>}
 */
const methodDescriptor_UserService_getUserByUsername = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/getUserByUsername',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  proto.com.bht.saigonparking.api.grpc.user.User,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.user.User>}
 */
const methodInfo_UserService_getUserByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.User,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.User.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.getUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getUserByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_getUserByUsername,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.User>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.getUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getUserByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_getUserByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer>}
 */
const methodDescriptor_UserService_getCustomerById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerById',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.Customer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer>}
 */
const methodInfo_UserService_getCustomerById = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.Customer.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.Customer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.Customer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.getCustomerById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerById',
      request,
      metadata || {},
      methodDescriptor_UserService_getCustomerById,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.Customer>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.getCustomerById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerById',
      request,
      metadata || {},
      methodDescriptor_UserService_getCustomerById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer>}
 */
const methodDescriptor_UserService_getCustomerByUsername = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerByUsername',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.Customer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer>}
 */
const methodInfo_UserService_getCustomerByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.Customer.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.Customer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.Customer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.getCustomerByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_getCustomerByUsername,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.Customer>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.getCustomerByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/getCustomerByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_getCustomerByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest,
 *   !proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse>}
 */
const methodDescriptor_UserService_mapToUsernameMap = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/mapToUsernameMap',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest,
  proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest,
 *   !proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse>}
 */
const methodInfo_UserService_mapToUsernameMap = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.mapToUsernameMap =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/mapToUsernameMap',
      request,
      metadata || {},
      methodDescriptor_UserService_mapToUsernameMap,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.user.MapToUsernameMapResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.mapToUsernameMap =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/mapToUsernameMap',
      request,
      metadata || {},
      methodDescriptor_UserService_mapToUsernameMap);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_UserService_createCustomer = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/createCustomer',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request
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
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_UserService_createCustomer = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.createCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/createCustomer',
      request,
      metadata || {},
      methodDescriptor_UserService_createCustomer,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.createCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/createCustomer',
      request,
      metadata || {},
      methodDescriptor_UserService_createCustomer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_updateCustomer = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/updateCustomer',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.Customer,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request
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
 *   !proto.com.bht.saigonparking.api.grpc.user.Customer,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_UserService_updateCustomer = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.updateCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/updateCustomer',
      request,
      metadata || {},
      methodDescriptor_UserService_updateCustomer,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.updateCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/updateCustomer',
      request,
      metadata || {},
      methodDescriptor_UserService_updateCustomer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_updatePassword = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/updatePassword',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest} request
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
 *   !proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_UserService_updatePassword = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.updatePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/updatePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_updatePassword,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.UpdatePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.updatePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/updatePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_updatePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_activateUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/activateUser',
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
const methodInfo_UserService_activateUser = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.activateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/activateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_activateUser,
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
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.activateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/activateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_activateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_deactivateUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/deactivateUser',
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
const methodInfo_UserService_deactivateUser = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.deactivateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deactivateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_deactivateUser,
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
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.deactivateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deactivateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_deactivateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_deleteUserById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/deleteUserById',
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
const methodInfo_UserService_deleteUserById = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.deleteUserById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deleteUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteUserById,
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
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.deleteUserById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deleteUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteUserById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_UserService_deleteMultiUserById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.user.UserService/deleteMultiUserById',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest} request
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
 *   !proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_UserService_deleteMultiUserById = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.user.UserServiceClient.prototype.deleteMultiUserById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deleteMultiUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteMultiUserById,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.user.DeleteMultiUserByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.user.UserServicePromiseClient.prototype.deleteMultiUserById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.user.UserService/deleteMultiUserById',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteMultiUserById);
};


module.exports = proto.com.bht.saigonparking.api.grpc.user;

