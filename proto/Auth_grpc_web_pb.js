/**
 * @fileoverview gRPC-Web generated client stub for com.bht.saigonparking.api.grpc.auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var Actor_pb = require('./Actor_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = {};
proto.com = {};
proto.com.bht = {};
proto.com.bht.saigonparking = {};
proto.com.bht.saigonparking.api = {};
proto.com.bht.saigonparking.api.grpc = {};
proto.com.bht.saigonparking.api.grpc.auth = require('./Auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient =
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
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient =
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
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest,
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>}
 */
const methodDescriptor_AuthService_validateUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/validateUser',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest,
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest,
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>}
 */
const methodInfo_AuthService_validateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.validateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/validateUser',
      request,
      metadata || {},
      methodDescriptor_AuthService_validateUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.validateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/validateUser',
      request,
      metadata || {},
      methodDescriptor_AuthService_validateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest,
 *   !proto.google.protobuf.StringValue>}
 */
const methodDescriptor_AuthService_registerUser = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/registerUser',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest,
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request
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
 *   !proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_AuthService_registerUser = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.StringValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.registerUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/registerUser',
      request,
      metadata || {},
      methodDescriptor_AuthService_registerUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.StringValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.registerUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/registerUser',
      request,
      metadata || {},
      methodDescriptor_AuthService_registerUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.StringValue>}
 */
const methodDescriptor_AuthService_sendResetPasswordEmail = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/sendResetPasswordEmail',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.StringValue} request
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
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_AuthService_sendResetPasswordEmail = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.StringValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.sendResetPasswordEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/sendResetPasswordEmail',
      request,
      metadata || {},
      methodDescriptor_AuthService_sendResetPasswordEmail,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.StringValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.sendResetPasswordEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/sendResetPasswordEmail',
      request,
      metadata || {},
      methodDescriptor_AuthService_sendResetPasswordEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.StringValue>}
 */
const methodDescriptor_AuthService_sendActivateAccountEmail = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/sendActivateAccountEmail',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.StringValue} request
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
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_AuthService_sendActivateAccountEmail = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.StringValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.sendActivateAccountEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/sendActivateAccountEmail',
      request,
      metadata || {},
      methodDescriptor_AuthService_sendActivateAccountEmail,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.StringValue>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.sendActivateAccountEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/sendActivateAccountEmail',
      request,
      metadata || {},
      methodDescriptor_AuthService_sendActivateAccountEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 */
const methodDescriptor_AuthService_generateNewToken = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/generateNewToken',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 */
const methodInfo_AuthService_generateNewToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.generateNewToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/generateNewToken',
      request,
      metadata || {},
      methodDescriptor_AuthService_generateNewToken,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.generateNewToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/generateNewToken',
      request,
      metadata || {},
      methodDescriptor_AuthService_generateNewToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 */
const methodDescriptor_AuthService_activateNewAccount = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.auth.AuthService/activateNewAccount',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 */
const methodInfo_AuthService_activateNewAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.activateNewAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/activateNewAccount',
      request,
      metadata || {},
      methodDescriptor_AuthService_activateNewAccount,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.auth.RefreshTokenResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.activateNewAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/activateNewAccount',
      request,
      metadata || {},
      methodDescriptor_AuthService_activateNewAccount);
};


module.exports = proto.com.bht.saigonparking.api.grpc.auth;

