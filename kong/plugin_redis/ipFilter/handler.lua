local IpFilterHandler = {}

function IpFilterHandler:access(plugin_conf)

    local redisHost = plugin_conf.redisHost
    local redisPort = plugin_conf.redisPort
    local redisPass = plugin_conf.redisPass

    local ipPrefix = "ip:"
    local clientIp = kong.client.get_ip();
    local redis = require "resty.redis"
    local red = redis:new()
    red:set_timeouts(1000, 1000, 1000) -- 1 sec

    local ok, err = red:connect(redisHost, redisPort)
    if not ok then
        kong.log.warn("failed to connect redis: ", err)
    else
        if(redisPass ~= "")
        then
            local auth, err = red:auth(redisPass)
            if not auth then
                kong.log.warn("failed to authenticate: ", err)
            end
        end
    
        local ipRes, err = red:get(ipPrefix..clientIp)
        if ipRes ~= ngx.null then
            kong.log.err("IP "..clientIp.. "  access denied")
            kong.response.exit(403, "IP "..clientIp .." forbidden access")
            return
        end
        local ok, err = red:set_keepalive(10000, 100) -- (超时时间 ms, 连接池大小)
    end
end

return IpFilterHandler
