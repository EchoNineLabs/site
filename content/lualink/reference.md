---
title: Reference
type: docs
weight: 5
---
LuaLink provides very basic set of APIs that would otherwise require user to manually manage lifecycle of some features. Our APIs include but are not limited to:

<br>

<section class="reference">

[**# Core Components**](#core-components)  
<sup>Libraries and utilities exposed to the script environment.</sup>  
[**# Script Context**](#script-context)  
<sup>Various methods to identify context the script is running in.</sup>  
[**# Scheduler**](#scheduler)  
<sup>Tasks registered by LuaLink APIs are automatically cancelled when script is unloaded.</sup>

<br>

## Core Components
Libraries and utilities exposed to the script environment.

**Libraries**
<div class="no-decoration" style="font-size: 14px; font-family: Ubuntu Mono, monospace;">

- {{< icon "collection" >}} [**string**](https://devdocs.io/lua/index#6.5)
- {{< icon "collection" >}} [**table**](https://devdocs.io/lua/index#6.7)
- {{< icon "collection" >}} [**math**](https://devdocs.io/lua/index#6.8)
- {{< icon "collection" >}} [**io**](https://devdocs.io/lua/index#6.9)
- {{< icon "collection" >}} [**os**](https://devdocs.io/lua/index#6.10)
- {{< icon "collection" >}} [**java**](https://gudzpoz.github.io/luajava/api.html)

</div>

**Functions**
<div class="no-decoration" style="font-size: 14px; font-family: Ubuntu Mono, monospace;">

- {{< icon "code" >}} [**pcall**](https://devdocs.io/lua/index#pdf-pcall)
- {{< icon "code" >}} [**assert**](https://devdocs.io/lua/index#pdf-assert)
- {{< icon "code" >}} [**error**](https://devdocs.io/lua/index#pdf-error)
- {{< icon "code" >}} [**type**](https://devdocs.io/lua/index#pdf-type)
- {{< icon "code" >}} [**pairs**](https://devdocs.io/lua/index#pdf-pairs)
- {{< icon "code" >}} [**ipairs**](https://devdocs.io/lua/index#pdf-ipairs)
- {{< icon "code" >}} [**next**](https://devdocs.io/lua/index#pdf-next)
- {{< icon "code" >}} [**select**](https://devdocs.io/lua/index#pdf-select)
- {{< icon "code" >}} [**tonumber**](https://devdocs.io/lua/index#pdf-tonumber)
- {{< icon "code" >}} [**tostring**](https://devdocs.io/lua/index#pdf-tostring)
- {{< icon "code" >}} [**require**](https://devdocs.io/lua/index#pdf-require)

</div>

**Variables**
<div class="no-decoration" style="font-size: 14px; font-family: Ubuntu Mono, monospace;">

- {{< icon "variable" >}} **script**
- {{< icon "variable" >}} **server**
- {{< icon "variable" >}} **scheduler**

</div>

<br>

## Script Context
Main script class available in the global scope of each script. Provides access to various utilities.

```lua {filename="Variables"}
--- Returns the name of the script.
script.name: string

--- Returns the script's Logger instance.
script.logger: Logger
```

```lua {filename="Functions"}
--- Registers a server command that players and console can execute.
--  @param handler The command handler function
--  @param metadata The command metadata table
script:registerCommand(handler: (sender: CommandSender, args: table) -> void, metadata: table): void

--- Registers an event listener.
--  @param event The event class
--  @param handler The event handler function
script:registerListener(event: string, handler: (event: Event) -> void): void
```

<br>

## Scheduler
Provides methods to schedule and manage tasks. It supports both synchronous and asynchronous task execution with various timing options.

```lua Functions
--- Schedules a task to run on the next tick.
--  @param handler The task function to execute
scheduler:run(handler: (BukkitRunnable) -> void): BukkitTask

--- Schedules an asynchronous task to run on the next tick.
--  @param handler The task function to execute
scheduler:runAsync(handler: (BukkitRunnable) -> void): BukkitTask

--- Schedules a task to run after a delay (in ticks).
--  @param handler The task function to execute
--  @param delay Delay in ticks before execution
scheduler:runDelayed(handler: (BukkitRunnable) -> void, delay: number): BukkitTask

--- Schedules an asynchronous task to run after a delay (in ticks).
--  @param handler The task function to execute
--  @param delay Delay in ticks before execution
scheduler:runDelayedAsync(handler: (BukkitRunnable) -> void, delay: number): BukkitTask

--- Schedules a repeating task.
--  @param handler The task function to execute
--  @param delay Delay in ticks before first execution
--  @param period Interval in ticks between executions
scheduler:runRepeating(handler: (BukkitRunnable) -> void, delay: number, period: number): BukkitTask

--- Schedules an asynchronous repeating task.
--  @param handler The task function to execute
--  @param delay Delay in ticks before first execution
--  @param period Interval in ticks between executions
scheduler:runRepeatingAsync(handler: (BukkitRunnable) -> void, delay: number, period: number): BukkitTask

--- Cancels the provided task.
--  @param taskId The id of the tas to cancel
--  @param runnable The runnable instance of the task to cancel
--  @param task The task to cancel
scheduler:cancel(taskId: number | runnable: BukkitRunnable | task: BukkitTask): void
```

</section>