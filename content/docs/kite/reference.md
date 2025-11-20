---
title: Reference
type: docs
weight: 2
---

Kite provides very basic set of APIs that would otherwise require user to manually manage lifecycle of some features. Our APIs include but are not limited to:
- Script Context  
  <sup>Various methods to identify context the script is running in.</sup>
- Command Registration  
  <sup>If you use Kite APIs to register commands - they will be automatically unregistered when script is unloaded.</sup>
- Scheduler / AsyncScheduler / EntityScheduler  
  <sup>If you use Kite extension methods to register tasks - they will be automatically cancelled when script is unloaded.</sup>


<br>

{{% details title="Script Context" closed="false" %}}
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

{{% /details %}}

<br>

{{% details title="Command Registration" %}}
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

{{% /details %}}

<br>

{{% details title="Scheduler / AsyncScheduler / EntityScheduler" %}}
TODO

{{% /details %}}


