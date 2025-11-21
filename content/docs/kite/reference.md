---
title: Reference
type: docs
weight: 2
---

<section class="reference">

Kite provides very basic set of APIs that would otherwise require user to manually manage lifecycle of some features. Our APIs include but are not limited to:

[**# Script Context**](#script-context)  
<sup>Various methods to identify context the script is running in.</sup>  
[**# Command Registration**](#command-registration)  
<sup>If you use Kite APIs to register commands - they will be automatically unregistered when script is unloaded.</sup>  
[**# Scheduler / AsyncScheduler / EntityScheduler**](#scheduler--asyncscheduler--entityscheduler)  
<sup>If you use Kite extension methods to register tasks - they will be automatically cancelled when script is unloaded.</sup>

<br>

## Script Context
Various methods to identify context the script is running in.

```kts {filename="Properties"}
// Name of the script.
val name: File

// Entry point file of the script.
val entryPoint: File

// Kite plugin instance.
val plugin: JavaPlugin

// Server instance.
val server: Server
```

<br>

## Command Registration
Non-complex commands can be created with little effort using built-in API. You also get an advantage of letting Kite handle the command lifecycle for you.

All properties except for the command name are optional.
```kts {filename="Example"}
command("echo") {
    // Properties
    description = "Prints specified message to the sender."
    permission = "scripts.command.echo"
    usage = "/echo [message]"
    aliases = listOf("e", "print")
    // Command Logic
    execute { sender, args ->
        // Joining arguments to string using space as delimiter.
        val message = args.joinToString(" ")
        // Sending message back to the sender.
        sender.sendRichMessage(message)
    }
    // Command Completions
    tabComplete { sender, args ->
        return@tabComplete emptyList()
    }
}
```

<br>

## Scheduler / AsyncScheduler / EntityScheduler
Using Kite extension functions for schedulers is highly recommended because plugin will automatically take care the task lifecycle. If you however decide to use Bukkit or Paper schedulers directly - make sure to unregister tasks when the script is unloaded.

<!-- BukkitScheduler -->

#### [**BukkitScheduler**](https://jd.papermc.io/paper/org/bukkit/scheduler/BukkitScheduler.html)
<sup>https://jd.papermc.io/paper/org/bukkit/scheduler/BukkitScheduler.html</sup>  
Bukkit scheduler is the easiest scheduler to use. It allows scheduling synchronous and asynchronous tasks and is tied to server tick time. This scheduler is not compatible with Folia.

{{< tabs items="Functions, Examples" >}}

{{< tab >}}
```kts {filename="Functions"}
// Schedules a task to run immediately or after specified delay in ticks.
fun BukkitScheduler.runTask(delayTicks: Long = 0, task: (BukkitRunnable) -> Unit): BukkitTask

// Schedules an asynchronous task to run immediately or after specified delay in ticks.
fun BukkitScheduler.runTaskAsync(delayTicks: Long = 0, task: (BukkitRunnable) -> Unit): BukkitTask 

// Schedules a repeating task to start immediately or after specified delay in ticks.
fun BukkitScheduler.runTaskTimer(
    delayTicks: Long = 0,
    periodTicks: Long,
    task: (BukkitRunnable) -> Unit
): BukkitTask

// Schedules an asynchronous repeating task to start immediately or after specified delay in ticks.
fun BukkitScheduler.runTaskTimerAsync(
    delayTicks: Long = 0,
    periodTicks: Long,
    task: (BukkitRunnable) -> Unit
): BukkitTask

```
{{< /tab >}}

{{< tab >}}
Broadcasting an automated message every 30 seconds.
```kts
fun resetQueue(): ListIterator<String> {
    return listOf(
        "<dark_gray>› <gray>Don't forget to leave a star on Kite repository!",
        "<dark_gray>› <gray>Did you know you can access APIs of other plugins?",
        "<dark_gray>› <gray>Join our Discord: <click:open_url:'https://discord.gg/xYcjBKqkDz'><yellow>discord.gg/xYcjBKqkDz</click>"
    ).listIterator()
}

// Queue of automated messages.
var messagesQueue = resetQueue()

onLoad {
    // Scheduling a repeating task to run every 10 seconds.
    server.scheduler.runTaskTimer(delayTicks = 1 * 20, periodTicks =  10 * 20) {
        // Resetting the queue if it has reached the end.
        if (messagesQueue.hasNext() == false)
            messagesQueue = resetQueue()
        // Sending a random message from the list.
        server.sendRichMessage(messagesQueue.next())
    }
}
```

{{< /tab >}}

{{< /tabs >}}

<br>

<!-- ASYNC SCHEDULER -->

#### [**AsyncScheduler**](https://jd.papermc.io/paper/io/papermc/paper/threadedregions/scheduler/AsyncScheduler.html)
<sup>https://jd.papermc.io/paper/io/papermc/paper/threadedregions/scheduler/AsyncScheduler.html</sup>  
Async scheduler can be used to schedule tasks to execute asynchronously from the server tick process.

{{< tabs items="Functions, Examples" >}}

{{< tab >}}
```kts {filename="Functions"}
// Schedules an asynchronous task to run on the next tick.
fun AsyncScheduler.runNow(task: (ScheduledTask) -> Unit): ScheduledTask

// Schedules an asynchronous task to run after specified delay.
fun AsyncScheduler.runDelayed(
    delay: Long,
    unit: TimeUnit,
    task: (ScheduledTask) -> Unit
): ScheduledTask

// Schedules an asynchronous repeating task to start after specified delay.
fun AsyncScheduler.runAtFixedRate(
    initialDelay: Long = 0,
    period: Long,
    unit: TimeUnit,
    task: (ScheduledTask) -> Unit
): ScheduledTask
```
{{< /tab >}}

{{< tab >}}
Command to asynchronously fetch country name using external [**get.geojs.io**](https://get.geojs.io) service.
```kt {filename="Examples"}
import java.lang.Thread
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

val client = HttpClient.newHttpClient()

command("what_is_my_country") {
    permission = "kite.command.what_is_my_country"
    execute { sender, args ->
        if (sender is Player) {
            server.asyncScheduler.runNow {
                sender.sendRichMessage("<dark_gray>› <gray>Running on: <yellow>${Thread.currentThread().name}<gray> (${if (Bukkit.isPrimaryThread()) "blocking" else "non-blocking"}<gray>)")
                // Creating and sending request that gets the country name from player's IP address.
                val request = HttpRequest.newBuilder().GET().uri(URI("https://get.geojs.io/v1/ip/country/full/${sender.address.address}")).build()
                val country = client.send(request, HttpResponse.BodyHandlers.ofString()).body().trim()
                // Sending response message to the command sender.
                sender.sendRichMessage("<dark_gray>› <gray>Query Response: <yellow>$country")
            }
        }
    }
}
```
![Output](https://i.postimg.cc/SswhHSLv/image.png)

{{< /tab >}}

{{< /tabs >}}

<br>

<!-- ASYNC SCHEDULER -->

#### [**EntityScheduler**](https://jd.papermc.io/paper/io/papermc/paper/threadedregions/scheduler/EntityScheduler.html)
<sup>https://jd.papermc.io/paper/1.21.10/io/papermc/paper/threadedregions/scheduler/EntityScheduler.html</sup>  
Entity scheduler allows tasks to be scheduled and executed on the region that owns the entity. This is useful when dealing with entity teleportation, as once an entity begins an asynchronous teleport the entity cannot tick until the teleport has completed, and the timing is undefined.

{{< tabs items="Functions, Examples" >}}

{{< tab >}}
```kts {filename="Functions"}
// Schedules an entity task to run on the next tick.
fun EntityScheduler.runNow(task: (ScheduledTask) -> Unit, retired: () -> Unit = {}): ScheduledTask

// Schedules an entity task to run after specified delay.
fun EntityScheduler.runDelayed(
    delay: Long,
    unit: TimeUnit,
    task: (ScheduledTask) -> Unit,
    retired: () -> Unit = {}
): ScheduledTask

// Schedules an entity repeating task to start after specified delay.
fun EntityScheduler.runAtFixedRate(
    initialDelay: Long = 0,
    period: Long,
    unit: TimeUnit,
    task: (ScheduledTask) -> Unit,
    retired: () -> Unit = {}
): ScheduledTask
```
{{< /tab >}}

{{< tab >}}

```kt {filename="Examples"}
on<PlayerJoinEvent> { event ->
    // Welcoming player to the server.
    // NOTE: There is no need to schedule a task for that - this is just an example.
    event.player.scheduler.runNow {
        it.sendPlainMessage("Hello, ${it.name} to our server!")
    }
    // Kicking player after 30 seconds of playing on the server.
    event.player.scheduler.runDelayed(30, TimeUnit.SECONDS, {
        it.kick(Component.text("You were playing for more than 30 seconds... That's too long! Please take a break."))
    })
    // Adding one experience level to the player every 5 seconds.
    event.player.scheduler.runAtFixedRate(5, 5, TimeUnit.SECONDS, {
        it.level = it.level + 1
    })
}
```
{{< /tab >}}

{{< /tabs >}}

</section>

