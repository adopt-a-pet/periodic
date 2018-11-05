<template>
<div class="signup janrain_embed">
    <div class="janrainContent">
        <div class="janrainPage">
            <ul class="providers" style="float: left; list-style-type: none; margin: 0px; padding: 0px;">
                <li @click="janrainOpen('facebook')" id="janrain-facebook" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="1" href="javascript:void(0);" class="gtm-uso-facebook" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-facebook" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-facebook" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Facebook</span></a></li>
                <li @click="janrainOpen('googleplus')" id="janrain-googleplus" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="3" href="javascript:void(0);" class="gtm-uso-googleplus" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-googleplus" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-googleplus" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Google</span></a></li>
            </ul>
            <ul v-if="!hideExtraSocial" class="providers" style="float: left; list-style-type: none; margin: 0px; padding: 0px;">
                <li @click="janrainOpen('yahoo')" id="janrain-yahoo" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-color: rgb(227, 227, 227); background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="2" href="javascript:void(0);" class="gtm-uso-yahoo" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-yahoo" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-yahoo" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">Yahoo!</span></a></li>
                <li @click="janrainOpen('linkedin')" id="janrain-linkedin" role="button" style="list-style: none; height: 50px; width: 229px; margin-top: 0px; margin-right: 5px; margin-bottom: 5px; position: relative; border: 1px solid rgb(204, 204, 204); border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; background-image: -webkit-linear-gradient(bottom, rgb(238, 238, 238), rgb(255, 255, 255));"><a tabindex="4" href="javascript:void(0);" class="gtm-uso-linkedin" style="font-family: Helvetica, &quot;lucida grande&quot;, Verdana, sans-serif; font-size: 12px; line-height: 14px; margin-left: auto; margin-right: auto; text-decoration: none; display: block; padding-left: 5px; padding-right: 5px; text-align: left;"><span class="janrain-provider-icon-32 janrain-provider-icon-linkedin" style="margin-top: 9px; background-color: transparent; margin-left: 5px;"></span><span class="janrain-provider-text-color-linkedin" style="font-family: arial; cursor: pointer; margin-left: 7px; text-align: left; margin-top: 16px; font-size: 16px; line-height: 20px; vertical-align: top; display: inline-block;">LinkedIn</span></a></li>
            </ul>
        </div>
    </div>

    <div v-if="allowExtraSocialExpand" data-link="accordion-link" class="h5__heading h5--bold m-space-r--tiny">
        <span @click="toggleExtraSocial" class="accordion-link">
            <svg class="m-space-r--tiny" v-bind:class="{'accordion-link-up': hideExtraSocial, 'accordion-link-down': !hideExtraSocial}">
                <use xlink:href="#aap-icon-next"></use>
            </svg>
            <span class="link-blue" >{{ hideExtraSocial ? "Log in with LinkedIn and Yahoo" : "Close LinkedIn and Yahoo" }}</span>
        </span>
    </div>
</div>
</template>

<script>
export default {
  name: "LoginJanrain",
  status: "under-review",
  release: "1.0.0",

  props: {
    hideExtraSocial: {
      type: Boolean,
      default: true,
    },

    allowExtraSocialExpand: {
      type: Boolean,
      default: true,
    },
  },

  mixins: [
    // require('./mixins/janrain-login'),
    // require('../../../js/shared/mixins/user-login')
  ],

  data() {
    return {}
  },

  methods: {
    toggleExtraSocial() {
      this.hideExtraSocial = !this.hideExtraSocial
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <LoginJanrain />
  </div>
</docs>
