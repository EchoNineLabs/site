---
title: "Libraries"
type: docs
weight: 4
---

LuaLink provides a way to load external **Java** libraries for use in your scripts, as well as to define and use embedded **Lua** libraries.

<br />

## Lua Libraries
Lua libraries are almost identical to scripts, but there are a few differences.
- Each Lua library should be placed in a separate folder in the `/plugins/LuaLink/libs` directory.  
  <sup>For example `/plugins/LuaLink/libs/example/main.lua` will be available as `example` or `example.main`.</sup>
- Entry point of a Lua library should be always be a `main.lua` file.  
  <sup>Different entry points are still possible however, and can be imported using a `.` denoted path, for example: `require("my_lib.my_entry_point")`</sup> 
- Lua Libraries are loaded on demand, using the `require` keyword.  
  <sup>For example, if we want to use the `example` library in our script, we can import it using the `require("example")`.</sup>

<br />

### Definition

This is an example `Counter` class that can be used to increment and decrement a counter.

{{% details title="Example Lua Library &ensp;—&ensp; Counter" closed="true" %}}

```lua /plugins/LuaLink/libs/counter/main.lua
local Counter = {}

-- Creates a new Counter instance.
function Counter.new()
    return {
        count = 0,

        -- Increments this Counter by 1.
        increment = function(self)
            self.count = self.count + 1
        end,

        -- Decrements this Counter by 1.
        decrement = function(self)
            self.count = self.count - 1
        end,

        -- Returns the current Counter value.
        get = function(self)
            return self.count
        end
    }
end

return Counter
```

{{% /details %}}

### Usage

Now, if we want to use the `Counter` class in our script, we can import it using the `require` keyword.
```lua /plugins/LuaLink/scripts/example_script/main.lua
local Counter = require("counter")

-- Creating a new instance of the Counter class.
local counter = Counter:new()
-- Incrementing the counter three times.
counter:increment()
counter:increment()
counter:increment()
-- Decrementing the counter once.
counter:decrement()
-- Printing current value of the counter to the console.
print(counter:get() .. " is the current value.")
```
```log Console Output
[00:00:00 INFO]: [LuaLink/example_script] 2 is the current value.
```

<br>

## Java Libraries
External Java/Kotlin libraries can be added by configuring the `/plugins/LuaLink/libraries.json` file. Dependencies will be downloaded and exposed to the scripting runtime after server restart.

### Configuration
```json /plugins/LuaLink/libraries.json
{
    // Repositories to be used for dependency resolution.
    "repositories": {
        // Repository definition using simple format.
        "PaperMC": "https://repo.papermc.io/repository/maven-public/",
        // Repository definition with credentials authentication.
        "SomePrivateRepository": {
            "url": "https://repo.example.com/private",
            "username": "RepositoryUsername",
            "password": "SecretRepositoryPassword123"
        }
    },
    // Dependencies to be downloaded and exposed to the scripting runtime.
    // Entries must be specified using Maven coordinate format: groupId:artifactId:version
    "dependencies": [
        "io.papermc:paperlib:1.0.7"
    ]
}
```

In this example, we are adding **[PaperLib](https://github.com/PaperMC/PaperLib)** library of version **1.0.7** from **[PaperMC](https://repo.papermc.io/repository/maven-public/)** repository. You can also see how and authenticate with a private repository using credentials, which might be essential when working with closed-source projects or **[GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry)**.

### Usage
After restarting the server, we should be able to import and access any class that belongs to specified library(-ies).

```lua /plugins/LuaLink/scripts/example_script/main.lua
local PaperLib = import("io.papermc.lib.PaperLib")

script.logger:info("Is the server running Paper? " .. (PaperLib:isPaper() and "YES" or "NO") .. "!")
```
```log Console Output
[00:00:00 INFO]: [LuaLink/example_script] Is the server running Paper? YES!
```
While this example may not be the best use of **PaperLib** - especially because **LuaLink** requires you to run the plugin on **Paper** - it is still a good example of how to use external libraries in your scripts.