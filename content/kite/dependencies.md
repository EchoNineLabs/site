---
title: Dependencies
type: docs
weight: 3
---

Kite allows you to dynamically download and load dependencies from Maven-compatible repositories.

{{< callout >}}
**IntelliJ IDEA Users:**  
You should also add declared repositories and dependencies to your **build.gradle.kts** file.  
Otherwise, completions will not appear in the editor.
{{< /callout >}}

<br>

{{% steps %}}

### Adding Repositories
Repositories can be specified per-script basis by adding a top-level `@file:Repository` annotation.
Annotation can be declared multiple times and you can add as many repositories as you need.

{{< callout type="warning" >}}
Please refrain from declaring official Maven Central repository, as this can be considered against their Terms of Service. You should instead use a mirror - like one in the example below.
{{< /callout >}}

```kts
@file:Repository("https://maven-central.storage-download.googleapis.com/maven2")
```

<hr>

### Adding Dependencies
Dependencies can be specified per-script basis by adding a top-level `@file:Dependency` annotation.
Annotation can be declared multiple times and you can add as many dependencies as you need.

```kts
@file:Dependency("com.github.ben-manes.caffeine:caffeine:3.2.3")
```

<hr>

### Relocation (Optional)
For those who need it, there's also a top-level `@file:Relocation` annotation that allows you to relocate a dependency using a specified pattern.
Annotation can be declared multiple times and you can configure as many relocations as you need.

```kts
@file:Relocation("pattern.from", "pattern.to")
```

### Downloading & Loading
As soon as you correctly declare your dependencies, it should be just the matter of reloading the script.  
Dependencies are downloaded in the runtime and stored inside `plugins/Kite/libs` directory.

{{% /steps %}}


## Full Example
```kts {filename="example.kite.kts"}
@file:Repository("https://maven-central.storage.googleapis.com/maven2/")
@file:Dependency("com.konghq:unirest-java-core:4.4.7")
@file:Relocation("kong.unirest", "libs.kong.unirest")

import libs.kong.unirest.core.Unirest

onLoad {
    val request = Unirest.get("https://get.geojs.io/v1/ip/country/full/8.8.8.8").asString()
    println(request.body)
}
```
```log {filename="Output"}
[22:44:17 INFO]: [Kite] Compiled test in 468ms
[22:44:17 INFO]: United States
[22:44:17 INFO]: 
[22:44:17 INFO]: [Kite] Script test has been successfully loaded.
```