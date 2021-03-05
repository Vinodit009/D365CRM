// JavaScript source code
var NHSPCRM_ATSNV_CONTACT = window.Sdk || {};
(function () {
    'use strict';
    this.OnSave = function (executionContext) {
        var formContext = executionContext.getFormContext();
        if (formContext.getAttribute("crm_source") !== undefined
            && formContext.getAttribute("crm_source").getValue() === 171060005) {
            NHSPCRM_ATSNV_CONTACT.OnSave_BankDetails(executionContext);
            NHSPCRM_ATSNV_CONTACT.NHSPVerificationCheck(executionContext);
        }
    },

        this.OnLoad = function (executionContext) {
            var formContext = executionContext.getFormContext();
            if (formContext.getAttribute("crm_source") !== undefined
                && formContext.getAttribute("crm_source").getValue() === 171060005) {
                NHSPCRM_ATSNV_CONTACT.OnLoad_BankAccountNumber(executionContext);
                NHSPCRM_ATSNV_CONTACT.OnLoad_SortCode(executionContext);
                NHSPCRM_ATSNV_CONTACT.OnLoadValidateHMRCFields(executionContext);
            }
        },

        this.OnLoadValidateHMRCFields = function (executionContext) {
            var formContext = executionContext.getFormContext();
            var formName = formContext.ui.formSelector.getCurrentItem().getLabel();
            var source = formContext.getAttribute("crm_source").getValue();
            if (source === 171060005 && formName === "National Vaccination Details") {
                var formtype = formContext.ui.getFormType();
                if (formtype === 1) {
                    formContext.getControl("crm_loanrepayingtocompany").setVisible(false);
                    formContext.getControl("crm_finishstudybefore6april").setVisible(false);
                    formContext.getControl("crm_loantype").setVisible(false);
                }
                if (formtype === 2) {
                    var haveStudentLoan = formContext.getAttribute("crm_stloannotrepaid").getValue();
                    if (haveStudentLoan !== null && haveStudentLoan !== undefined) {
                        if (haveStudentLoan === 171060001) {
                            formContext.getControl("crm_loanrepayingtocompany").setVisible(true);
                            formContext.getAttribute("crm_loanrepayingtocompany").setRequiredLevel("required");
                            var repayLoanToCompany = formContext.getAttribute("crm_loanrepayingtocompany").getValue();
                            if (repayLoanToCompany !== null && repayLoanToCompany !== undefined) {
                                if (repayLoanToCompany === 171060001) {
                                    formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                                    formContext.getControl("crm_loantype").setVisible(false);
                                    formContext.getAttribute("crm_loantype").setValue(null);
                                    formContext.getAttribute("crm_loantype").setRequiredLevel("none");
                                } else {
                                    formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                                    formContext.getControl("crm_loantype").setVisible(true);
                                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                                    formContext.getAttribute("crm_loantype").setRequiredLevel("required");
                                }
                            } else {
                                formContext.getControl("crm_finishstudybefore6april").setVisible(false);
                                formContext.getControl("crm_loantype").setVisible(false);
                            }
                        } else {
                            formContext.getControl("crm_loanrepayingtocompany").setVisible(false);
                            formContext.getAttribute("crm_loanrepayingtocompany").setValue(null);
                            formContext.getAttribute("crm_loanrepayingtocompany").setRequiredLevel("none");
                            formContext.getControl("crm_loantype").setVisible(false);
                            formContext.getAttribute("crm_loantype").setValue(null);
                            formContext.getAttribute("crm_loantype").setRequiredLevel("none");
                            formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                            formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                        }
                    } else {
                        formContext.getControl("crm_loanrepayingtocompany").setVisible(false);
                        formContext.getControl("crm_finishstudybefore6april").setVisible(false);
                        formContext.getControl("crm_loantype").setVisible(false);
                    }
                }
            }
        },

        this.OnChangeHMRCIsStudentLoanPaid = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var formName = formContext.ui.formSelector.getCurrentItem().getLabel();
            var source = formContext.getAttribute("crm_source").getValue();
            if (source === 171060005 && formName === "National Vaccination Details") {
                var havstudentloan = formContext.getAttribute("crm_stloannotrepaid").getValue();
                if (havstudentloan === 171060001) {
                    formContext.getControl("crm_loanrepayingtocompany").setVisible(true);
                    formContext.getAttribute("crm_loanrepayingtocompany").setRequiredLevel("required");
                    formContext.getControl("crm_finishstudybefore6april").setVisible(false);
                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("none");
                    formContext.getControl("crm_loantype").setVisible(false);
                    formContext.getAttribute("crm_loantype").setRequiredLevel("none");
                } else {
                    formContext.getControl("crm_loanrepayingtocompany").setVisible(false);
                    formContext.getAttribute("crm_loanrepayingtocompany").setValue(null);
                    formContext.getAttribute("crm_loanrepayingtocompany").setRequiredLevel("none");
                    formContext.getControl("crm_loantype").setVisible(false);
                    formContext.getAttribute("crm_loantype").setValue(null);
                    formContext.getAttribute("crm_loantype").setRequiredLevel("none");
                    formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                    formContext.getAttribute("crm_finishstudybefore6april").setValue(null);
                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                }
            }
        },

        this.OnChangeHMRCRepayStudentLoan = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var formName = formContext.ui.formSelector.getCurrentItem().getLabel();
            var source = formContext.getAttribute("crm_source").getValue();
            if (source === 171060005 && formName === "National Vaccination Details") {
                var loantocompany = formContext.getAttribute("crm_loanrepayingtocompany").getValue();
                if (loantocompany === 171060001) {
                    formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                    formContext.getAttribute("crm_finishstudybefore6april").setValue(null);
                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                    formContext.getControl("crm_loantype").setVisible(false);
                    formContext.getAttribute("crm_loantype").setValue(null);
                    formContext.getAttribute("crm_loantype").setRequiredLevel("none");
                } else {
                    formContext.getControl("crm_finishstudybefore6april").setVisible(true);
                    formContext.getAttribute("crm_finishstudybefore6april").setValue(null);
                    formContext.getAttribute("crm_finishstudybefore6april").setRequiredLevel("required");
                    formContext.getControl("crm_loantype").setVisible(true);
                    formContext.getAttribute("crm_loantype").setValue(null);
                    formContext.getAttribute("crm_loantype").setRequiredLevel("required");
                }
            }
        },

        this.NHSPVerificationCheck = function (executionContext) {
            var formContext = executionContext.getFormContext();

            if (formContext.getAttribute("crm_righttoworkverified") !== undefined &&
                formContext.getAttribute("crm_occupationalhealthoutcomeverifiedwithprov") !== undefined &&
                formContext.getAttribute("crm_vettingoutcomeverifiedwithprovider") !== undefined &&
                formContext.getAttribute("crm_source") !== undefined) {

                var rtwVerified = formContext.getAttribute("crm_righttoworkverified");
                var ohOutComeVerified = formContext.getAttribute("crm_occupationalhealthoutcomeverifiedwithprov");
                var voVerified = formContext.getAttribute("crm_vettingoutcomeverifiedwithprovider");
                var source = formContext.getAttribute("crm_source").getValue();

                if (source === 171060005 && (rtwVerified.getValue() === true && ohOutComeVerified.getValue() === true && voVerified.getValue() === true)) {
                    var isValid = true;
                    var vetProvider = formContext.getAttribute("crm_vettingprovider").getValue();
                    var vetOutcome = formContext.getAttribute("crm_vettingoutcome").getValue();
                    var vetResultDate = formContext.getAttribute("crm_vettingresultdate").getValue();

                    var ohOutcom = formContext.getAttribute("crm_occupationalhealthoutcome").getValue();
                    //var ohReference = formContext.getAttribute("crm_occupationalhealthreference").getValue();
                    var ohResultDate = formContext.getAttribute("crm_occupationalhealthresultdate").getValue();
                    var ohAssessor = formContext.getAttribute("crm_occupationalhealthassessor").getValue();

                    //fields null or blank check for NHSP Verification
                    if (vetProvider === null || vetProvider === '' || vetOutcome === null || vetOutcome === ''
                        || vetResultDate === null || vetResultDate === '' || ohOutcom === null || ohOutcom === ''
                        // || ohReference === null || ohReference === '' 
                        || ohResultDate === null || ohResultDate === ''
                        || ohAssessor === null || ohAssessor === '') {
                        isValid = false;
                    }
                    //Right to Wok compliance record check.
                    var isValidRTWCompliance = NHSPCRM_ATSNV_CONTACT.RightToWorkCompCheckForNHSPVerification(executionContext);
                    // var isValidPRCompliance = NHSPCRM_ATSNV_CONTACT.PRCompCheckForNHSPVerification(executionContext);
                    var isValidBankMember = NHSPCRM_ATSNV_CONTACT.BankMemberCheckForNHSPVerification(executionContext);
                    if (isValid === true && isValidRTWCompliance === true && isValidBankMember === true) {
                        var currentUser = new Array();
                        currentUser[0] = new Object();
                        currentUser[0].entityType = "systemuser";
                        currentUser[0].id = Xrm.Utility.getGlobalContext().userSettings.userId;
                        currentUser[0].name = Xrm.Utility.getGlobalContext().userSettings.userName;
                        formContext.getAttribute("crm_verifiedby").setValue(currentUser);
                        var currentDate = new Date();
                        formContext.getAttribute("crm_verificationcompleteddatetime").setValue(currentDate);
                    }
                    else {
                        var alertOptions = { height: 300, width: 500 };
                        var message = {
                            text: "\nNHSP Verification Submit Failure - The following child record(s)/field(s) must be complete before the record can be saved as 'Complete',\n\t\u2022 Right to Work Compliance.\n\t\u2022 Bank Member. \n\t\u2022 Vetting Provider, \n\t\u2022 Vetting Outcome, \n\t\u2022 Vetting Result Date, \n\t\u2022 Occupational Health Outcome,\n\t\u2022 Occupational Health Result Date,\n\t\u2022 Occupational Health Assessor."
                        };
                        Xrm.Navigation.openAlertDialog(message, alertOptions, function () { });
                        executionContext.getEventArgs().preventDefault();
                    }
                }
            }
        },

        this.RightToWorkCompCheckForNHSPVerification = function (executionContext) {
            var formContext = executionContext.getFormContext();
            var recordId = formContext.data.entity.getId();
            var flag = false;
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/crm_compliancerecords?$select=crm_righttoworkstatus,_crm_righttoworktype_value&$filter=crm_compliancetype eq 171060000 and crm_righttoworkstatus eq 171060000 and statecode eq 0 and _crm_contact_value eq " + recordId, false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var rtwRecords = JSON.parse(this.response);
                        if (rtwRecords.value.length > 0) {
                            flag = true;
                        }
                    } else {
                        Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                        executionContext.getEventArgs().preventDefault();
                    }
                }
                else {
                    Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                    executionContext.getEventArgs().preventDefault();
                }
            };
            req.send();
            return flag;
        },

        this.PRCompCheckForNHSPVerification = function (executionContext) {
            var formContext = executionContext.getFormContext();
            var recordId = formContext.data.entity.getId();
            var flag = false;
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/crm_compliancerecords?$select=crm_compliancerecordid&$filter=crm_compliancetype eq 171060001 and statecode eq 0 and _crm_contact_value eq " + recordId, false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var prRecords = JSON.parse(this.response);
                        if (prRecords.value.length > 0) {
                            flag = true;
                        }
                    } else {
                        Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                        executionContext.getEventArgs().preventDefault();
                    }
                }
                else {
                    Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                    executionContext.getEventArgs().preventDefault();
                }
            };
            req.send();
            return flag;
        },

        this.BankMemberCheckForNHSPVerification = function (executionContext) {
            var formContext = executionContext.getFormContext();
            var recordId = formContext.data.entity.getId();
            var flag = false;
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/crm_bankmembers?$select=crm_bankmemberid&$filter=statecode eq 0 and _crm_contact_value eq " + recordId, false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var bmRecords = JSON.parse(this.response);
                        if (bmRecords.value.length > 0) {
                            flag = true;
                        }
                    } else {
                        Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                        executionContext.getEventArgs().preventDefault();
                    }
                }
                else {
                    Xrm.Navigation.openAlertDialog("NHSPVerificationCheck api failed: " + req.responseText, alertOptions, function () { });
                    executionContext.getEventArgs().preventDefault();
                }
            };
            req.send();
            return flag;
        },

        this.OnChange_IBANValidation = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var formType = formContext.ui.getFormType();
            var accountNumber = null;
            var sortCode = null;
            var accountNumberValue = null;
            var sortCodeValue = null;
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                if (formType === 1) {
                    accountNumber = formContext.getAttribute("crm_accountnumber");
                    sortCode = formContext.getAttribute("crm_sortcode");
                    if ((accountNumber !== null && accountNumber !== undefined && accountNumber !== "") && (sortCode !== null && sortCode !== undefined && sortCode !== "")) {
                        accountNumberValue = accountNumber.getValue();
                        sortCodeValue = sortCode.getValue();
                    }
                }
                else if (formType === 2) {
                    accountNumber = formContext.getAttribute("crm_accountnumber");
                    sortCode = formContext.getAttribute("crm_sortcode");
                    if (accountNumber !== null && accountNumber !== undefined && accountNumber !== "") {
                        accountNumberValue = accountNumber.getValue();
                        if (accountNumberValue !== null && accountNumberValue !== undefined && accountNumberValue !== "") {
                            if (accountNumberValue.indexOf('****') !== -1) {
                                if (formContext.getAttribute("crm_actualaccountnumber") !== null && formContext.getAttribute("crm_actualaccountnumber") !== undefined
                                    && formContext.getAttribute("crm_actualaccountnumber") !== "")
                                    accountNumberValue = formContext.getAttribute("crm_actualaccountnumber").getValue();
                            }
                        }
                    }
                    if (sortCode !== null && sortCode !== undefined && sortCode !== "") {
                        sortCodeValue = sortCode.getValue();
                        if (sortCodeValue !== null && sortCodeValue !== undefined && sortCodeValue !== "") {
                            if (sortCodeValue.indexOf('****') !== -1) {
                                if (formContext.getAttribute("crm_actualsortcode") !== null && formContext.getAttribute("crm_actualsortcode") !== undefined
                                    && formContext.getAttribute("crm_actualsortcode") !== "")
                                    sortCodeValue = formContext.getAttribute("crm_actualsortcode").getValue();
                            }
                        }
                    }
                }
                if (accountNumberValue !== null && accountNumberValue !== undefined && accountNumberValue !== "" &&
                    sortCodeValue !== null && sortCodeValue !== undefined && sortCodeValue !== "") {
                    var IBANAPISubscriptionKey = null;
                    var IBANAPIUrl = null;
                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/crm_systemsettings?$select=crm_ibanapiurl,crm_ibanapisubscriptionkey", false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\",odata.maxpagesize=1");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                for (var i = 0; i < results.value.length; i++) {
                                    IBANAPIUrl = results.value[i]["crm_ibanapiurl"];
                                    IBANAPISubscriptionKey = results.value[i]["crm_ibanapisubscriptionkey"];
                                }
                            }
                        }
                    };
                    req.send();

                    if (IBANAPIUrl !== null && IBANAPIUrl !== undefined && IBANAPIUrl !== "" &&
                        IBANAPISubscriptionKey !== null && IBANAPISubscriptionKey !== undefined && IBANAPISubscriptionKey !== "") {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open("GET", IBANAPIUrl + "?sortcode=" + sortCodeValue + "&account=" + accountNumberValue + " HTTP/1.1 Host: cdtnhspapi.azure-api.net", false);
                        xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", IBANAPISubscriptionKey);
                        xhttp.send(null);
                        var response = JSON.parse(xhttp.responseText);
                        if (response.error !== null && response.error !== undefined) {
                            if (response.error.$t.toLowerCase() === "sort code cannot be found") {
                                alert("Sort code cannot be found. Please provide a valid UK Sort code.");
                                formContext.getAttribute("crm_accountnumber").setValue(null);
                                formContext.getAttribute("crm_sortcode").setValue(null);
                                formContext.getAttribute("crm_bankbuildingsocietyname").setValue(null);
                                formContext.getAttribute("crm_branch").setValue(null);
                            } else if (response.error.$t.toLowerCase() === "account number or sort code is not valid!") {
                                alert("Account number or Sort code is not valid. Please provide a UK Bank account number/ Sort code.");
                                formContext.getAttribute("crm_accountnumber").setValue(null);
                                formContext.getAttribute("crm_sortcode").setValue(null);
                                formContext.getAttribute("crm_bankbuildingsocietyname").setValue(null);
                                formContext.getAttribute("crm_branch").setValue(null);
                            }
                        } else if (response.result !== null && response.result !== undefined) {
                            if (response.result.bank_name !== null) {
                                var bankName = response.result.bank_name.$t;
                                formContext.getAttribute("crm_bankbuildingsocietyname").setValue(bankName);
                            }
                            if (response.result.branch_name !== null) {
                                var branchName = response.result.branch_name.$t;
                                formContext.getAttribute("crm_branch").setValue(branchName);
                            }
                        }
                    }
                }
            }
        },

        this.OnChange_CheckAccountNumber = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                var fieldName = "crm_accountnumber";
                //  Use Regex from this link http://regexlib.com/UserPatterns.aspx?authorId=e52f1f3c-83dd-4dad-a4c8-ed4745dbf278
                var regEx = /^(\d){7,8}$/;
                var msg = "Account number is a required field. Please provide a UK bank account number which is minimum 7 and maximum 8 digits";
                if (formContext.getAttribute("crm_accountnumber").getValue() !== null) {
                    NHSPCRM_ATSNV_CONTACT.checkFormat(formContext, fieldName, regEx, msg);
                } else {
                    formContext.getControl("crm_accountnumber").clearNotification();
                }
            }
        },

        this.OnChange_CheckSortCode = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                var fieldName = "crm_sortcode";
                //  Use Regex from this link http://stackoverflow.com/questions/11341957/uk-bank-sort-code-javascript-regular-expression
                var regEx = /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/;
                var msg = "Sort code is a required field. Please provide a UK sort code which is 6 digits";
                if (formContext.getAttribute("crm_sortcode").getValue() !== null) {
                    NHSPCRM_ATSNV_CONTACT.checkFormat(formContext, fieldName, regEx, msg);
                } else {
                    formContext.getControl("crm_sortcode").clearNotification();
                }
            }
        },

        this.checkFormat = function (formContext, fieldname, regEx, msg) {
            if (formContext.getAttribute(fieldname) !== null) {
                var strField = formContext.getAttribute(fieldname).getValue();
                var controlField = formContext.getControl(fieldname);
                var isValid = (strField.match(regEx) !== null);
                if (isValid) {
                    // Field is now valid - clear any existing notification.
                    controlField.clearNotification();
                } else {
                    controlField.setNotification(msg);
                }
            }
        },

        this.OnLoad_BankAccountNumber = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                if (formContext.getAttribute("crm_accountnumber").getValue() !== null) {
                    var bankaccountnumber = formContext.getAttribute("crm_accountnumber").getValue();
                    if (bankaccountnumber.indexOf('*****') !== -1) { } else {
                        var newstring = "*****";
                        if (bankaccountnumber.length === 8) {
                            formContext.getAttribute("crm_actualaccountnumber").setValue(bankaccountnumber);
                            var ban = newstring + bankaccountnumber.slice(-3);
                            formContext.getAttribute("crm_accountnumber").setValue(ban);
                        }
                    }
                    if (bankaccountnumber.indexOf('****') !== -1) { } else {
                        var newstring = "****";
                        if (bankaccountnumber.length == 7) {
                            formContext.getAttribute("crm_actualaccountnumber").setValue(bankaccountnumber);
                            var ban = newstring + bankaccountnumber.slice(-3);
                            formContext.getAttribute("crm_accountnumber").setValue(ban);
                        }
                    }
                }
            }
        },

        this.OnLoad_SortCode = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                if (formContext.getAttribute("crm_sortcode").getValue() !== null) {
                    var sortcode = formContext.getAttribute("crm_sortcode").getValue();
                    if (sortcode.indexOf('****') !== -1) { } else {
                        var newstring = "****";
                        if (sortcode.length === 6) {
                            formContext.getAttribute("crm_actualsortcode").setValue(sortcode);
                            var ban = newstring + sortcode.slice(-2);
                            formContext.getAttribute("crm_sortcode").setValue(ban);
                        }
                    }
                    if (sortcode.indexOf('******') !== -1) { } else {
                        var newstring = "******";
                        if (sortcode.length === 8) {
                            formContext.getAttribute("crm_actualsortcode").setValue(sortcode);
                            var ban = newstring + sortcode.slice(-2);
                            formContext.getAttribute("crm_sortcode").setValue(ban);
                        }
                    }
                }
            }
        },

        this.OnSave_BankDetails = function (executionContext) {
            var formContext = executionContext.getFormContext(); // get formContext
            var source = formContext.getAttribute("crm_source");
            var sourceValue = null;
            if (source !== null && source !== undefined && source !== "") {
                sourceValue = source.getValue();
            }
            if (sourceValue === 171060005) {
                if (formContext.getAttribute("crm_sortcode").getIsDirty() === true && formContext.getAttribute("crm_sortcode").getValue() !== null) {
                    var sortcode = formContext.getAttribute("crm_sortcode").getValue();
                    if (sortcode.indexOf('****') !== -1) { } else {
                        var newstring = "****";
                        if (sortcode.length === 6) {
                            formContext.getAttribute("crm_actualsortcode").setValue(sortcode);
                            var ban = newstring + sortcode.slice(-2);
                            formContext.getAttribute("crm_sortcode").setValue(ban);
                        }
                    }
                    if (sortcode.indexOf('******') !== -1) { } else {
                        var newstring = "******";
                        if (sortcode.length === 8) {
                            formContext.getAttribute("crm_actualsortcode").setValue(sortcode);
                            var ban = newstring + sortcode.slice(-2);
                            formContext.getAttribute("crm_sortcode").setValue(ban);
                        }
                    }
                }
                if (formContext.getAttribute("crm_accountnumber").getIsDirty() === true && formContext.getAttribute("crm_accountnumber").getValue() !== null) {
                    var bankaccountnumber = formContext.getAttribute("crm_accountnumber").getValue();
                    if (bankaccountnumber.indexOf('*****') !== -1) { } else {
                        var newstring = "*****";
                        if (bankaccountnumber.length === 8) {
                            formContext.getAttribute("crm_actualaccountnumber").setValue(bankaccountnumber);
                            var ban = newstring + bankaccountnumber.slice(-3);
                            formContext.getAttribute("crm_accountnumber").setValue(ban);
                        }
                    }
                    if (bankaccountnumber.indexOf('****') !== -1) { } else {
                        var newstring = "****";
                        if (bankaccountnumber.length === 7) {
                            formContext.getAttribute("crm_actualaccountnumber").setValue(bankaccountnumber);
                            var ban = newstring + bankaccountnumber.slice(-3);
                            formContext.getAttribute("crm_accountnumber").setValue(ban);
                        }
                    }
                }
            }
        }

}).call(NHSPCRM_ATSNV_CONTACT);