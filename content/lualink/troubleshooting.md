---
title: Troubleshooting
type: docs
weight: 7
---
When developing with LuaLink, you may occasionally encounter some issues or road blocks. Compatibility layer and interop with Java programming is really high, but there are things that should be kept in mind.

<br>

### Extending Java Classes
Extending Java classes from within Lua is not implemented as the library and translation layer we use does not come with this feature by default.

We are actively looking into different ways to implement that, but unfortunately it proved to not be an easy task.

<br>

### Asynchronous Programming
Asynchronous programming should be fully supported however, calling Java in non-synchronized context may lead to invalid memory access and that may lead to a JVM crash.

Asynchronous operations that interact with Java — except from our [**Scheduler API**](reference#scheduler) as it already does that under the hood — should be wrapped with a `synchronized` block.

```lua
local ScheduledTask = import("io.papermc.paper.threadedregions.scheduler.ScheduledTask")

-- AsyncScheduler is not our API and therefore must be wrapped to ensure thread-safety.
Bukkit:getAsyncScheduler():runNow(Bukkit:getPluginManager():getPlugin("LuaLink"), function(task)
    -- First parameter is a Java class that will be wrapped, and second is the logic function.
    synchronized(ScheduledTask, function()
        Bukkit:getServer():sendMessage("Hello!")
    end)
end)
```

<br>

### Method Signatures & Overloads
Some APIs provide a few methods with similar signature, and while LuaJava tries to always choose the correct one, it may occasionally fail. To call a specific method, you can use `java.method` function where you can specify the signature of the method you intend to call.

```lua
Math = java.import('java.lang.Math')
max = java.method(Math, 'max', 'int,int')
assert(max(1.2, 2.3) == 2)
```

```lua
Math = java.import('java.lang.Math')
max = java.method(Math, 'max', 'double,double')
assert(max(1.2, 2.3) == 2.3)
```

For more information please refer to the [**LuaJava**](https://gudzpoz.github.io/luajava/api.html#method-resolution) documentation.