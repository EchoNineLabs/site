---
title: IDE Integration
type: docs
weight: 5
---

Writing scripts in **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** is pretty straightforward if you're already familiar that IDE. Most editor features should work after a little setup, which will be described in this section.

<br>

{{% steps %}}

### Prerequisites
- Instance of **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** editor installed on your PC.
- Basic knowledge of **[Kotlin](https://kotlinlang.org)** language and **[Gradle](https://gradle.org)** build system.

<hr>

### Repository
Easiest way to get started is to clone **[EchoNineLabs/KiteScripting](https://github.com/EchoNineLabs/KiteScripting)** repository.
```bash
git clone https://github.com/EchoNineLabs/KiteScripting.git
```
Once cloned, open it as a project in **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** and load included **[Gradle](https://gradle.org)** configuration.

<hr>

### Configuration
There is one thing you need to enable before you can start writing scripts, and that is, adding `.kite.kts` as recognizable script definition.  

1. Go to **Settings ➜ Languages & Frameworks ➜ Kotlin ➜ Kotlin Scripting** and click **Scan Classpath** button at the bottom.
2. Once **1 new definition(s) found in classpath** text appears, click **Apply** then **OK**.
3. Re-open the same settings page and make sure **Kite Script** definition (`.kite.kts`) is listed and enabled.

![IntelliJ IDEA](https://i.postimg.cc/KYZQx2pb/image.png)

<hr>

### Dependencies
Since the project itself is a Gradle project, all dependencies are managed via `build.gradle.kts` file.

For example, if you would like to use a more recent version of Paper, configure build script like this:
```kts {filename="build.gradle.kts"}
dependencies {
    // Excluding Paper API that Kite is depending on. (1.21.1)
    api("dev.echonine.kite:kite:1.2.4") {
        exclude(module = "paper-api")
    }
    // Declaring more up-to-date version of Paper API.
    api("io.papermc.paper:paper-api:1.21.11-R0.1-SNAPSHOT")
}
```

Using custom [**Dependencies**](/kite/dependencies) in your scripts?  
Don't forget to also add them to your build script. Otherwise, they won't appear in code completions.
```kts {filename="example.kite.kts"}
@file:Repository("https://repo.extendedclip.com/releases/")
@file:Dependency("me.clip:placeholderapi:2.11.7")
```
```kts {filename="build.gradle.kts"}
repositories {
    ...
    maven { url = uri("https://repo.extendedclip.com/releases/") }
}

dependencies {
    ...
    api("me.clip:placeholderapi:2.11.7")
}
```

More information about dependencies can be found here:
{{< cards cols="3" >}}
    {{< card link="/kite/dependencies" title="Dependencies" subtitle="Remote and Local Dependencies" >}}
{{< /cards >}}

<hr>

### Writing Scripts
Scripts can be put pretty much anywhere, but it is recommended to keep them in `src` directory.

You can also organize them within subdirectories like explained in [**Getting Started**](/kite/getting-started/#structure) guide but keep in mind additional files imported via `@file:Import` will not appear in completions due to editor bug / limitation.

{{% /steps %}}